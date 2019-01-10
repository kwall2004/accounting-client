import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

import { Day } from 'src/app/core/models/day';
import { CoreState, CalendarSelectors, AppActions, CalendarActions, AppSelectors } from 'src/app/core/store';
import { TransactionRequest } from 'src/app/core/models/transaction-request';
import { Transaction } from 'src/app/core/models/transaction';
import { TransactionComponent } from 'src/app/shared/transaction/transaction.component';
import { Recurrence } from 'src/app/core/models/recurrence';
import { RecurrenceComponent } from 'src/app/shared/recurrence/recurrence.component';
import { CaptureConfirmationComponent } from 'src/app/shared/capture-confirmation/capture-confirmation.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject();

  private transactionRequest: TransactionRequest = {
    beginDate: moment().startOf('month').startOf('day').toDate(),
    endDate: moment().endOf('month').endOf('day').toDate()
  };

  previousMonthEndBalance$: Observable<number>;
  monthName$: Observable<string>;
  captured$: Observable<boolean>;

  weeks: Day[][];

  constructor(
    private store: Store<CoreState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.select(CalendarSelectors.weeks).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(weeks => this.weeks = weeks);

    this.previousMonthEndBalance$ = this.store.select(CalendarSelectors.beginningBalance);
    this.monthName$ = this.store.select(CalendarSelectors.monthName);
    this.captured$ = this.store.select(CalendarSelectors.captured);

    this.store.dispatch(new AppActions.ParseAuthHash([
      new CalendarActions.GetRecurrences(),
      new CalendarActions.Load(this.transactionRequest)
    ]));
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
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

  onMonthNameClick() {
    const dialogRef = this.dialog.open(CaptureConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CalendarActions.CaptureMonth(this.weeks));
      }
    });
  }

  onTransactionDescriptionClick(transaction: Transaction) {
    this.dialog.open(TransactionComponent, {
      width: '400px',
      data: transaction
    });
  }

  onTransactionAmountClick(transaction: Transaction) {
    this.store.dispatch(new CalendarActions.PatchTransaction({
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
