import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TransactionRequest } from '../models/transaction-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) { }

  public get(request: TransactionRequest): Observable<any> {
    return this.httpClient.get('https://accounting-48336-api.herokuapp.com/transaction');
  }
}
