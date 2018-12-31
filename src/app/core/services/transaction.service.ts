import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TransactionRequest } from '../models/transaction-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) { }

  public get(request: TransactionRequest): Observable<any> {
    const where = {
      date: {
        '>=': request.beginDate.toISOString(),
        '<=': request.endDate.toISOString()
      }
    };

    return this.httpClient.get(`${environment.apiBaseUrl}/transaction?where=${JSON.stringify(where)}`);
  }
}
