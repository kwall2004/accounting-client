import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) { }

  public get(beginDate: Date, endDate: Date): Observable<any> {
    const where = {
      date: {
        '>=': moment(beginDate).format('YYYY-MM-DD'),
        '<=': moment(endDate).format('YYYY-MM-DD')
      }
    };

    return this.httpClient.get(`${environment.apiBaseUrl}/transaction?where=${JSON.stringify(where)}`);
  }

  public post(transaction: Transaction) {
    return this.httpClient.post(`${environment.apiBaseUrl}/transaction`, {
      ...transaction,
      date: moment(transaction.date).format('YYYY-MM-DD')
    });
  }

  public patch(transaction: Transaction) {
    return this.httpClient.patch(`${environment.apiBaseUrl}/transaction/${transaction.id}`, transaction);
  }

  public delete(transaction: Transaction) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/transaction/${transaction.id}`);
  }
}
