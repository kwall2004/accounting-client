import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { TransactionRequest } from '../models/transaction-request';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) { }

  public get(request: TransactionRequest): Observable<any> {
    const where = {
      date: {
        '>=': moment(request.beginDate).format('YYYY-MM-DDTHH:mm:ss'),
        '<=': moment(request.endDate).format('YYYY-MM-DDTHH:mm:ss')
      }
    };

    return this.httpClient.get(`${environment.apiBaseUrl}/transaction?where=${JSON.stringify(where)}`);
  }

  public patch(transaction: Transaction) {
    return this.httpClient.patch(`${environment.apiBaseUrl}/transaction/${transaction.id}`, JSON.stringify(transaction));
  }
}
