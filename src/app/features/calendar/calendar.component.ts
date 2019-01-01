import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Transaction } from 'src/app/core/models/transaction';
import { Day } from 'src/app/core/models/day';
import { Balance } from 'src/app/core/models/balance';
import { CoreState, CalendarSelectors, CalendarActions } from 'src/app/core/store';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject();

  monthName: string;
  monthBalance: number;
  weeks: Day[][];

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    const beginDate = moment().subtract(1, 'month').startOf('month').startOf('day');
    const endDate = moment().subtract(1, 'month').endOf('month').endOf('day');

    this.store.dispatch(new CalendarActions.GetTransactions({
      beginDate: beginDate.clone().utc(true).toDate(),
      endDate: endDate.clone().utc(true).toDate()
    }));

    this.store.dispatch(new CalendarActions.GetBalances({
      date: beginDate.clone().utc(true).subtract(1, 'day').toDate()
    }));

    this.store.select(CalendarSelectors.transactions).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe((transactions: Transaction[]) => {
      const days = new Array<Day>();

      this.monthName = beginDate.format('MMMM YYYY');

      days.push(...new Array(beginDate.day())
        .fill(beginDate)
        .map((date, index): Day => ({
          date: date.clone().subtract(date.day() - index, 'days').toDate(),
          transactions: [],
          disabled: true
        })));

      for (let date = moment(beginDate).clone(); date <= moment(endDate); date = date.add(1, 'days')) {
        days.push({
          date: date.toDate(),
          transactions: transactions.filter(t => date.isSame(t.date, 'day'))
        });
      }

      days.push(...new Array(6 - endDate.day())
        .fill(endDate)
        .map((date, index): Day => ({
          date: date.clone().add(index + 1, 'days').toDate(),
          transactions: [],
          disabled: true
        })));

      this.weeks = days.reduce((weeks: Day[][], day) => {
        if (weeks.length === 0 || weeks[weeks.length - 1].length === 7) {
          weeks.push([]);
        }

        weeks[weeks.length - 1].push(day);

        return weeks;
      }, []);
    });

    this.store.select(CalendarSelectors.balances).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe((balances: Balance[]) => {
      this.monthBalance = balances.length && balances[0].amount;
    });
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }
}
