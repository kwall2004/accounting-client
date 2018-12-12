import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BalanceRequest } from '../models/balance-request';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private httpClient: HttpClient) { }

  public read(request: BalanceRequest): Observable<any> {
    return this.httpClient.post('http://localhost:49386/api/balance/read', request);
  }
}
