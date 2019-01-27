import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { take, mergeMap, catchError, tap, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CoreState } from '../store';
import { AppSelectors } from '../store/selectors/app.selectors';
import { AppActions } from '../store/actions/app.actions';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private store: Store<CoreState>) { }

  getNewRequest(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.store.select(AppSelectors.authToken).pipe(
      take(1),
      mergeMap(token => {
        headers['Authorization'] = `Bearer ${token}`;
        return of(request.clone({
          setHeaders: headers
        }));
      })
    );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.getNewRequest(request).pipe(
      tap(() => this.store.dispatch(new AppActions.StoreLoading(true))),
      mergeMap(newRequest => next.handle(newRequest).pipe(
        catchError(error => throwError(error))
      )),
      finalize(() => this.store.dispatch(new AppActions.StoreLoading(false)))
    );
  }
}
