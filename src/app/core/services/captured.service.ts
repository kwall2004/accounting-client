import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { Captured } from '../models/captured';

@Injectable({
  providedIn: 'root'
})
export class CapturedService {
  constructor(private httpClient: HttpClient) { }

  public get(date: Date): Observable<any> {
    const where = {
      date: moment(date).format('YYYY-MM-DDTHH:mm:ss')
    };

    return this.httpClient.get(`${environment.apiBaseUrl}/captured?where=${JSON.stringify(where)}`);
  }

  public post(captured: Captured): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/captured`, { date: moment(captured.date).format('YYYY-MM-DDTHH:mm:ss') });
  }
}
