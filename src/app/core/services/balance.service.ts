import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BalanceRequest } from '../models/balance-request';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private httpClient: HttpClient) { }

  public get(request: BalanceRequest): Observable<any> {
    const where = {
      date: request.date.toISOString()
    };

    return this.httpClient.get(`${environment.apiBaseUrl}/balance?where=${JSON.stringify(where)}`);
  }
}
