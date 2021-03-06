import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { takeUntil, take, withLatestFrom, skipWhile, skip } from 'rxjs/operators';

import { Day } from '../../core/models/day';
import { CoreState, CalendarSelectors, AppActions, CalendarActions, AppSelectors } from '../../core/store';
import { Transaction } from '../../core/models/transaction';
import { TransactionDialogComponent } from '../../shared/dialogs/transaction-dialog/transaction-dialog.component';
import { Recurrence } from '../../core/models/recurrence';
import { RecurrenceDialogComponent } from '../../shared/dialogs/recurrence-dialog/recurrence-dialog.component';
import { CaptureMonthDialogComponent } from '../../shared/dialogs/capture-month-dialog/capture-month-dialog.component';
import { Balance } from '../../core/models/balance';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject();
  private dialogIsClosed$ = new Subject();

  days: Day[];
  previousMonthDays: Day[];
  beginningBalance$: Observable<Balance>;
  name$: Observable<string>;
  captured$: Observable<boolean>;
  bankBalance$: Observable<number>;
  unclearedBalance$: Observable<number>;

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
          balanceAmount: 0,
          recurrences: [],
          disabled: true
        }));
    });

    this.beginningBalance$ = this.store.select(CalendarSelectors.beginningBalance);
    this.name$ = this.store.select(CalendarSelectors.name);
    this.captured$ = this.store.select(CalendarSelectors.captured);
    this.bankBalance$ = this.store.select(CalendarSelectors.bankBalance);
    this.unclearedBalance$ = this.store.select(CalendarSelectors.unclearedBalance);

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
      new AppActions.ReadRecurrences(),
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
        balanceAmount: 0,
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
      width: '300px',
      autoFocus: false
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new CalendarActions.UpdateCaptured(this.days));
      }
    });
  }

  onDayClick(day: Day) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        date: day.date
      } as Transaction
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => this.dialogIsClosed$.next());

    dialogRef.componentInstance.update.pipe(takeUntil(this.dialogIsClosed$)).subscribe((t: Transaction) => {
      this.store.dispatch(new CalendarActions.CreateTransaction(t));
    });
  }

  onTransactionClick(transaction: Transaction) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: transaction
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => this.dialogIsClosed$.next());

    this.store.select(AppSelectors.loading).pipe(
      takeUntil(this.dialogIsClosed$),
      skip(1),
      skipWhile(loading => loading),
      withLatestFrom(this.store.select(CalendarSelectors.transactions))
    ).subscribe(([_, tt]: [boolean, Transaction[]]) => {
      dialogRef.componentInstance.transaction = tt.find(t => t.id === dialogRef.componentInstance.transaction.id);
    });

    dialogRef.componentInstance.update.pipe(takeUntil(this.dialogIsClosed$)).subscribe((t: Transaction) => {
      this.store.dispatch(new CalendarActions.UpdateTransaction(t));
    });

    dialogRef.componentInstance.delete.pipe(takeUntil(this.dialogIsClosed$)).subscribe((t: Transaction) => {
      this.store.dispatch(new CalendarActions.DeleteTransaction(t));
    });
  }

  onTransactionAmountClick(transaction: Transaction) {
    this.store.dispatch(new CalendarActions.UpdateTransaction({
      ...transaction,
      cleared: !transaction.cleared
    }));
  }

  onRecurrenceClick(recurrence: Recurrence) {
    const dialogRef = this.dialog.open(RecurrenceDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: recurrence
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => this.dialogIsClosed$.next());

    dialogRef.componentInstance.update.pipe(takeUntil(this.dialogIsClosed$)).subscribe((r: Recurrence) => {
      this.store.dispatch(new AppActions.UpdateRecurrence(r));
    });

    dialogRef.componentInstance.delete.pipe(takeUntil(this.dialogIsClosed$)).subscribe((r: Recurrence) => {
      this.store.dispatch(new AppActions.DeleteRecurrence(r));
    });
  }
}
