import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

import { Day } from '../../core/models/day';
import { CoreState, CalendarSelectors, AppActions, CalendarActions, AppSelectors } from '../../core/store';
import { Transaction } from '../../core/models/transaction';
import { TransactionDialogComponent } from '../../shared/dialogs/transaction-dialog/transaction-dialog.component';
import { Recurrence } from '../../core/models/recurrence';
import { RecurrenceDialogComponent } from '../../shared/dialogs/recurrence-dialog/recurrence-dialog.component';
import { CaptureMonthDialogComponent } from '../../shared/dialogs/capture-month-dialog/capture-month-dialog.component';
import { Balance } from '../../core/models/balance';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject();

  days: Day[];
  previousMonthDays: Day[];
  beginningBalance: Balance;
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

      this.previousMonthDays = new Array(moment(days[0].date).day())
        .fill(moment(days[0].date))
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
      new CalendarActions.ReadRecurrences(),
      new CalendarActions.Load()
    ]));
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }

  getNextMonthDays(count: number): Day[] {
    return new Array(count)
      .fill(moment(this.days[this.days.length - 1].date))
      .map((date, index): Day => ({
        date: date.clone().add(index + 1, 'days').toDate(),
        transactions: [],
        balance: 0,
        recurrences: [],
        disabled: true
      }));
  }

  onPreviousMonthClick() {
    this.store.dispatch(new CalendarActions.PreviousMonth());
  }

  onNextMonthClick() {
    this.store.dispatch(new CalendarActions.NextMonth());
  }

  onNameClick() {
    const dialogRef = this.dialog.open(CaptureMonthDialogComponent, {
      width: '200px'
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new CalendarActions.UpdateCaptured(this.days));
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

    dialogRef.componentInstance.updated.pipe(takeUntil(dialogIsClosed)).subscribe((t: Transaction) => {
      this.store.dispatch(new CalendarActions.UpdateTransaction(t));
    });
  }

  onTransactionAmountClick(transaction: Transaction) {
    this.store.dispatch(new CalendarActions.UpdateTransaction({
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
