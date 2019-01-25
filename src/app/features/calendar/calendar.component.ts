import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

import { Day } from '../../core/models/day';
import { CoreState, CalendarSelectors, AppActions, CalendarActions, AppSelectors } from '../../core/store';
import { TransactionRequest } from '../../core/models/transaction-request';
import { Transaction } from '../../core/models/transaction';
import { TransactionDialogComponent } from '../../shared/dialogs/transaction-dialog/transaction-dialog.component';
import { Recurrence } from '../../core/models/recurrence';
import { RecurrenceDialogComponent } from '../../shared/dialogs/recurrence-dialog/recurrence-dialog.component';
import { CaptureMonthDialogComponent } from '../../shared/dialogs/capture-month-dialog/capture-month-dialog.component';

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

  days: Day[];
  previousMonthDays: Day[];
  beginningBalance: number;
  name: string;
  captured: boolean;

  constructor(
    private store: Store<CoreState>,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.select(CalendarSelectors.days).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(days => {
      this.days = days;

      this.previousMonthDays = new Array(moment(this.transactionRequest.beginDate).day())
        .fill(moment(this.transactionRequest.beginDate))
        .map((date, index): Day => ({
          date: date.clone().subtract(date.day() - index, 'days').toDate(),
          transactions: [],
          balance: 0,
          recurrences: [],
          disabled: true
        }));
    });

    this.store.select(CalendarSelectors.beginningBalance).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(beginningBalance => {
      this.beginningBalance = beginningBalance;
    });

    this.store.select(CalendarSelectors.name).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(name => {
      this.name = name;
    });

    this.store.select(CalendarSelectors.captured).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(captured => {
      this.captured = captured;
    });

    this.store.select(AppSelectors.loading).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(loading => {
      if (loading) {
        this.cd.detach();
      } else {
        this.cd.reattach();
        this.cd.detectChanges();
      }
    });

    this.store.dispatch(new AppActions.ParseAuthHash([
      new CalendarActions.GetRecurrences(),
      new CalendarActions.Load(this.transactionRequest)
    ]));
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }

  getNextMonthDays(count: number): Day[] {
    return new Array(count)
      .fill(moment(this.transactionRequest.endDate))
      .map((date, index): Day => ({
        date: date.clone().add(index + 1, 'days').toDate(),
        transactions: [],
        balance: 0,
        recurrences: [],
        disabled: true
      }));
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

  onNameClick() {
    const dialogRef = this.dialog.open(CaptureMonthDialogComponent, {
      width: '200px'
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new CalendarActions.CaptureMonth(this.days, [
          new CalendarActions.GetTransactions(this.transactionRequest),
          new CalendarActions.GetCaptured(this.transactionRequest)
        ]));
      }
    });
  }

  onTransactionClick(transaction: Transaction) {
    const dialogIsClosed = new Subject();

    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: transaction
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => dialogIsClosed.next());

    this.store.select(CalendarSelectors.transactions).pipe(takeUntil(dialogIsClosed)).subscribe((tt: Transaction[]) => {
      dialogRef.componentInstance.transaction = tt.find(t => t.id === dialogRef.componentInstance.transaction.id);
    });

    dialogRef.componentInstance.patch.pipe(takeUntil(dialogIsClosed)).subscribe((t: Transaction) => {
      this.store.dispatch(new CalendarActions.PatchTransaction(t));
    });
  }

  onTransactionAmountClick(transaction: Transaction) {
    this.store.dispatch(new CalendarActions.PatchTransaction({
      ...transaction,
      cleared: !transaction.cleared
    }));
  }

  onRecurrenceClick(recurrence: Recurrence) {
    this.dialog.open(RecurrenceDialogComponent, {
      width: '400px',
      data: recurrence
    });
  }
}
