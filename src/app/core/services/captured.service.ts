import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { TransactionRequest } from '../models/transaction-request';

@Injectable({
  providedIn: 'root'
})
export class CapturedService {
  constructor(private httpClient: HttpClient) { }

  public get(request: TransactionRequest): Observable<any> {
    const where = {
      date: moment(request.beginDate).format('YYYY-MM-DDTHH:mm:ss')
    };

    return this.httpClient.get(`${environment.apiBaseUrl}/captured?where=${JSON.stringify(where)}`);
  }
}
