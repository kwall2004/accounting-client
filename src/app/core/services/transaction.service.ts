import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TransactionRequest } from '../models/transaction-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) { }

  public read(request: TransactionRequest): Observable<any> {
    return this.httpClient.post('http://localhost:49386/api/transaction/read', request);
  }
}
