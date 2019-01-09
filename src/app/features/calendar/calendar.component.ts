import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';

import { Day } from 'src/app/core/models/day';
import { CoreState, CalendarSelectors, AppActions, CalendarActions, AppSelectors } from 'src/app/core/store';
import { TransactionRequest } from 'src/app/core/models/transaction-request';
import { Transaction } from 'src/app/core/models/transaction';
import { TransactionComponent } from 'src/app/shared/transaction/transaction.component';
import { Recurrence } from 'src/app/core/models/recurrence';
import { RecurrenceComponent } from 'src/app/shared/recurrence/recurrence.component';

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
  loading$: Observable<boolean>;

  transactionRequest: TransactionRequest = {
    beginDate: moment().startOf('month').startOf('day').toDate(),
    endDate: moment().endOf('month').endOf('day').toDate()
  };

  constructor(
    private store: Store<CoreState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.weeks$ = this.store.select(CalendarSelectors.weeks);
    this.previousMonthEndBalance$ = this.store.select(CalendarSelectors.beginningBalance);
    this.monthName$ = this.store.select(CalendarSelectors.monthName);
    this.loading$ = this.store.select(AppSelectors.loading);

    this.store.dispatch(new AppActions.ParseAuthHash([
      new CalendarActions.GetRecurrences(),
      new CalendarActions.Load(this.transactionRequest)
    ]));
  }

  onPreviousMonthClick() {
    this.transactionRequest = {
      beginDate: moment(this.transactionRequest.beginDate).clone().subtract(1, 'month').startOf('month').startOf('day').toDate(),
      endDate: moment(this.transactionRequest.endDate).clone().subtract(1, 'month').endOf('month').endOf('day').toDate()
    };

    this.store.dispatch(new CalendarActions.Load(this.transactionRequest));
  }

  onNextMonthClick() {
    this.transactionRequest = {
      beginDate: moment(this.transactionRequest.beginDate).clone().add(1, 'month').startOf('month').startOf('day').toDate(),
      endDate: moment(this.transactionRequest.endDate).clone().add(1, 'month').endOf('month').endOf('day').toDate()
    };

    this.store.dispatch(new CalendarActions.Load(this.transactionRequest));
  }

  onTransactionDescriptionClick(transaction: Transaction) {
    this.dialog.open(TransactionComponent, {
      width: '400px',
      data: transaction
    });
  }

  onTransactionAmountClick(transaction: Transaction) {
    this.store.dispatch(new CalendarActions.PutTransaction({
      ...transaction,
      cleared: !transaction.cleared
    }));
  }

  onRecurrenceClick(recurrence: Recurrence) {
    this.dialog.open(RecurrenceComponent, {
      width: '400px',
      data: recurrence
    });
  }
}
