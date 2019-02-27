import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, withLatestFrom, map, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { CalendarActions, CalendarActionTypes } from '../actions';
import { TransactionService, BalanceService, CapturedService, TransactionsService } from '../../services';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Captured } from '../../models/captured';
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
    private transactionsService: TransactionsService
  ) { }

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.Load>(CalendarActionTypes.LOAD),
    mergeMap(_ => [
      new CalendarActions.ReadCaptureds(),
      new CalendarActions.ReadTransactions(),
      new CalendarActions.ReadBalances(),
      new CalendarActions.ReadUnclearedTransactions()
    ])
  );

  @Effect()
  loadSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.Load>(CalendarActionTypes.LOAD),
    mergeMap(_ => forkJoin(
      this.actions$.pipe(ofType<CalendarActions.StoreCaptureds>(CalendarActionTypes.STORE_CAPTUREDS), first()),
      this.actions$.pipe(ofType<CalendarActions.StoreTransactions>(CalendarActionTypes.STORE_TRANSACTIONS), first()),
      this.actions$.pipe(ofType<CalendarActions.StoreBalances>(CalendarActionTypes.STORE_BALANCES), first()),
      this.actions$.pipe(ofType<CalendarActions.StoreUnclearedBalance>(CalendarActionTypes.STORE_UNCLEARED_BALANCE), first())
    ).pipe(
      map(() => new CalendarActions.UpdateBalance())
    ))
  );

  @Effect()
  nextMonth$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.NextMonth>(CalendarActionTypes.NEXT_MONTH),
    map(() => new CalendarActions.Load())
  );

  @Effect()
  previousMonth$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.PreviousMonth>(CalendarActionTypes.PREVIOUS_MONTH),
    map(() => new CalendarActions.Load())
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
  createTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.CreateTransaction>(CalendarActionTypes.CREATE_TRANSACTION),
    mergeMap(action => this.transactionService.post(action.payload).pipe(
      mergeMap((transaction: Transaction) => [new CalendarActions.StoreTransaction(transaction)]),
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
  deleteTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.DeleteTransaction>(CalendarActionTypes.DELETE_TRANSACTION),
    mergeMap(action => this.transactionService.delete(action.payload).pipe(
      mergeMap(() => [new CalendarActions.RemoveTransaction(action.payload)]),
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
    mergeMap(([_, beginDate, endDate]) => this.balanceService.get(moment(beginDate).subtract(1, 'day').toDate(), moment(endDate).startOf('day').toDate()).pipe(
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
    map(() => new CalendarActions.UpdateBalance())
  );

  @Effect()
  removeTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.StoreTransaction>(CalendarActionTypes.REMOVE_TRANSACTION),
    map(() => new CalendarActions.UpdateBalance())
  );

  @Effect()
  updateBalance$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.UpdateBalance>(CalendarActionTypes.UPDATE_BALANCE),
    withLatestFrom(
      this.store.select(CalendarSelectors.days),
      this.store.select(CalendarSelectors.endingBalance)
    ),
    mergeMap(([_, days, endingBalance]) => this.balanceService.patch({ ...endingBalance, amount: days[days.length - 1].balanceAmount }).pipe(
      mergeMap(() => []),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  readUnclearedTransactions$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.ReadUnclearedTransactions>(CalendarActionTypes.READ_UNCLEARED_TRANSACTIONS),
    mergeMap(() => this.transactionService.getUncleared().pipe(
      mergeMap((transactions: Transaction[]) => [new CalendarActions.StoreUnclearedBalance(transactions.reduce((total, t) => total + t.amount, 0))]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );
}
