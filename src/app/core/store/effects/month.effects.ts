import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, withLatestFrom, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { CalendarActions, CalendarActionTypes } from '../actions';
import { TransactionService, BalanceService, CapturedService, RecurrenceService, TransactionsService } from '../../services';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Captured } from '../../models/captured';
import { Recurrence } from '../../models/recurrence';
import { Day } from '../../models/day';
import { CoreState } from '../reducers';
import { CalendarSelectors } from '../selectors';

@Injectable()
export class CalendarEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CoreState>,
    private toastrService: ToastrService,
    private transactionService: TransactionService,
    private balanceService: BalanceService,
    private capturedService: CapturedService,
    private recurrenceService: RecurrenceService,
    private transactionsService: TransactionsService
  ) { }

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.Load>(CalendarActionTypes.LOAD),
    mergeMap(_ => [
      new CalendarActions.ReadCaptureds(),
      new CalendarActions.ReadTransactions(),
      new CalendarActions.ReadBalances()
    ])
  );

  @Effect()
  nextMonth$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.NextMonth>(CalendarActionTypes.NEXT_MONTH),
    map(_ => new CalendarActions.Load())
  );

  @Effect()
  previousMonth$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.PreviousMonth>(CalendarActionTypes.PREVIOUS_MONTH),
    map(_ => new CalendarActions.Load())
  );

  @Effect()
  readTransactions$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.ReadTransactions>(CalendarActionTypes.READ_TRANSACTIONS),
    withLatestFrom(
      this.store.select(CalendarSelectors.beginDate),
      this.store.select(CalendarSelectors.endDate)
    ),
    mergeMap(([_, beginDate, endDate]) => this.transactionService.get(beginDate, endDate).pipe(
      mergeMap((transactions: Transaction[]) => [new CalendarActions.StoreTransactions(transactions)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  updateTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.UpdateTransaction>(CalendarActionTypes.UPDATE_TRANSACTION),
    mergeMap(action => this.transactionService.patch(action.payload).pipe(
      mergeMap((transaction: Transaction) => [new CalendarActions.StoreTransaction(transaction)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  readBalances$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.ReadBalances>(CalendarActionTypes.READ_BALANCES),
    withLatestFrom(
      this.store.select(CalendarSelectors.beginDate),
      this.store.select(CalendarSelectors.endDate)
    ),
    mergeMap(([_, beginDate, endDate]) => this.balanceService.get(beginDate, endDate).pipe(
      mergeMap((balances: Balance[]) => [new CalendarActions.StoreBalances(balances)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  readCaptureds$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.ReadCaptureds>(CalendarActionTypes.READ_CAPTUREDS),
    withLatestFrom(this.store.select(CalendarSelectors.beginDate)),
    mergeMap(([_, beginDate]) => this.capturedService.get(beginDate).pipe(
      mergeMap((captureds: Captured[]) => [new CalendarActions.StoreCaptureds(captureds)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  readRecurrences$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.ReadRecurrences>(CalendarActionTypes.READ_RECURRENCES),
    mergeMap(() => this.recurrenceService.get().pipe(
      mergeMap((recurrences: Recurrence[]) => [new CalendarActions.StoreRecurrences(recurrences)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  updateCaptured$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.UpdateCaptured>(CalendarActionTypes.UPDATE_CAPTURED),
    mergeMap(action => {
      const days = action.payload;
      const transactions = [
        ...days.reduce((dayTransactions: Transaction[], day: Day): Transaction[] => [
          ...dayTransactions,
          ...day.recurrences.map((r): Transaction => ({
            date: day.date,
            description: r.description,
            category: r.category,
            amount: r.amount,
            cleared: false
          }))
        ], [])
      ];

      return this.transactionsService.post(transactions).pipe(
        mergeMap(() => this.capturedService.post({ date: days[0].date }).pipe(
          mergeMap(() => [new CalendarActions.Load()]),
          catchError(error => {
            console.error(error);
            this.toastrService.error(error.message || JSON.stringify(error));
            return [];
          })
        )),
        catchError(error => {
          console.error(error);
          this.toastrService.error(error.message || JSON.stringify(error));
          return [];
        })
      );
    })
  );

  @Effect()
  storeTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.StoreTransaction>(CalendarActionTypes.STORE_TRANSACTION),
    withLatestFrom(
      this.store.select(CalendarSelectors.days),
      this.store.select(CalendarSelectors.endingBalance)
    ),
    mergeMap(([_, days, endingBalance]) => this.balanceService.patch({ ...endingBalance, amount: days[days.length - 1].balance }).pipe(
      mergeMap(() => []),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );
}
