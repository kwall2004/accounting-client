import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';

import { Day } from 'src/app/core/models/day';
import { CoreState, CalendarSelectors, AppActions, CalendarActions } from 'src/app/core/store';
import { TransactionRequest } from 'src/app/core/models/transaction-request';
import { Transaction } from 'src/app/core/models/transaction';
import { TransactionComponent } from 'src/app/shared/transaction/transaction.component';

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
    this.previousMonthEndBalance$ = this.store.select(CalendarSelectors.previousMonthEndBalance);
    this.monthName$ = this.store.select(CalendarSelectors.monthName);

    this.store.dispatch(new AppActions.ParseAuthHash([
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

  onTransactionClick(transaction: Transaction) {
    this.dialog.open(TransactionComponent, {
      data: transaction
    });
  }
}
