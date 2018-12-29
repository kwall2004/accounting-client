import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  getNewRequest(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.auth.accessToken.pipe(
      take(1),
      mergeMap(tokenData => {
        headers['Authorization'] = `Bearer ${tokenData}`;
        return of(request.clone({
          setHeaders: headers
        }));
      })
    );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.getNewRequest(request).pipe(
      mergeMap(newRequest => next.handle(newRequest).pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      ))
    );
  }
}
