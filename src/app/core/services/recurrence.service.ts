import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { Recurrence } from '../models/recurrence';

@Injectable({
  providedIn: 'root'
})
export class RecurrenceService {
  constructor(private httpClient: HttpClient) { }

  public get(): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/recurrence`);
  }

  public post(recurrence: Recurrence) {
    return this.httpClient.post(`${environment.apiBaseUrl}/recurrence`, {
      ...recurrence,
      startDate: moment(recurrence.startDate).format('YYYY-MM-DD'),
      endDate: moment(recurrence.endDate).format('YYYY-MM-DD')
    });
  }

  public patch(recurrence: Recurrence) {
    return this.httpClient.patch(`${environment.apiBaseUrl}/recurrence/${recurrence.id}`, recurrence);
  }

  public delete(recurrence: Recurrence) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/recurrence/${recurrence.id}`);
  }
}
