import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Balance } from '../models/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private httpClient: HttpClient) { }

  public get(beginDate: Date, endDate: Date): Observable<any> {
    const where = {
      date: [
        moment(beginDate).subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss'),
        moment(endDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
      ]
    };

    return this.httpClient.get(`${environment.apiBaseUrl}/balance?where=${JSON.stringify(where)}`).pipe(
      map((balances: Balance[]) => {
        if (balances.length !== 2) {
          throw Error('Balances not found.');
        }

        return balances;
      })
    );
  }

  public patch(balance: Balance) {
    return this.httpClient.patch(`${environment.apiBaseUrl}/balance/${balance.id}`, JSON.stringify(balance));
  }
}
