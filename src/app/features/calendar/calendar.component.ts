import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Day } from 'src/app/core/models/day';
import { CoreState, CalendarSelectors, AppActions, CalendarActions } from 'src/app/core/store';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  weeks$: Observable<Day[][]>;
  previousMonthEndBalance$: Observable<number>;
  monthName$: Observable<string>;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    const beginDate = moment().subtract(1, 'month').startOf('month').startOf('day');
    const endDate = moment().subtract(1, 'month').endOf('month').endOf('day');

    this.weeks$ = this.store.select(CalendarSelectors.weeks);
    this.previousMonthEndBalance$ = this.store.select(CalendarSelectors.previousMonthEndBalance);
    this.monthName$ = this.store.select(CalendarSelectors.monthName);

    this.store.dispatch(new AppActions.ParseAuthHash([
      new CalendarActions.GetTransactions({
        beginDate: beginDate.clone().toDate(),
        endDate: endDate.clone().toDate()
      }),
      new CalendarActions.GetBalances({
        date: beginDate.clone().subtract(1, 'day').toDate()
      })
    ]));
  }
}
