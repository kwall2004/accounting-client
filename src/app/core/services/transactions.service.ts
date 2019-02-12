import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) { }

  public post(transactions: Transaction[]): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/transactions`, transactions.map(t => ({
      ...t,
      date: moment(t.date).format('YYYY-MM-DD')
    })), { responseType: 'text' });
  }
}
