import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, withLatestFrom, map, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { MonthActions, MonthActionTypes } from '../actions';
import { TransactionService, BalanceService, CapturedService, TransactionsService } from '../../services';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Captured } from '../../models/captured';
import { Day } from '../../models/day';
import { CoreState } from '../reducers';
import { MonthSelectors } from '../selectors';

@Injectable()
export class MonthEffects {
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
    ofType<MonthActions.Load>(MonthActionTypes.LOAD),
    mergeMap(_ => [
      new MonthActions.ReadCaptureds(),
      new MonthActions.ReadTransactions(),
      new MonthActions.ReadBalances()
    ])
  );

  @Effect()
  loadSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.Load>(MonthActionTypes.LOAD),
    mergeMap(_ => forkJoin(
      this.actions$.pipe(ofType<MonthActions.StoreCaptureds>(MonthActionTypes.STORE_CAPTUREDS), first()),
      this.actions$.pipe(ofType<MonthActions.StoreTransactions>(MonthActionTypes.STORE_TRANSACTIONS), first()),
      this.actions$.pipe(ofType<MonthActions.StoreBalances>(MonthActionTypes.STORE_BALANCES), first())
    ).pipe(
      map(() => new MonthActions.UpdateBalance())
    ))
  );

  @Effect()
  nextMonth$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.NextMonth>(MonthActionTypes.NEXT_MONTH),
    map(() => new MonthActions.Load())
  );

  @Effect()
  previousMonth$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.PreviousMonth>(MonthActionTypes.PREVIOUS_MONTH),
    map(() => new MonthActions.Load())
  );

  @Effect()
  readTransactions$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.ReadTransactions>(MonthActionTypes.READ_TRANSACTIONS),
    withLatestFrom(
      this.store.select(MonthSelectors.beginDate),
      this.store.select(MonthSelectors.endDate)
    ),
    mergeMap(([_, beginDate, endDate]) => this.transactionService.get(beginDate, endDate).pipe(
      mergeMap((transactions: Transaction[]) => [new MonthActions.StoreTransactions(transactions)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  updateTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.UpdateTransaction>(MonthActionTypes.UPDATE_TRANSACTION),
    mergeMap(action => this.transactionService.patch(action.payload).pipe(
      mergeMap((transaction: Transaction) => [new MonthActions.StoreTransaction(transaction)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  readBalances$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.ReadBalances>(MonthActionTypes.READ_BALANCES),
    withLatestFrom(
      this.store.select(MonthSelectors.beginDate),
      this.store.select(MonthSelectors.endDate)
    ),
    mergeMap(([_, beginDate, endDate]) => this.balanceService.get(moment(beginDate).subtract(1, 'day').toDate(), moment(endDate).startOf('day').toDate()).pipe(
      mergeMap((balances: Balance[]) => [new MonthActions.StoreBalances(balances)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  readCaptureds$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.ReadCaptureds>(MonthActionTypes.READ_CAPTUREDS),
    withLatestFrom(this.store.select(MonthSelectors.beginDate)),
    mergeMap(([_, beginDate]) => this.capturedService.get(beginDate).pipe(
      mergeMap((captureds: Captured[]) => [new MonthActions.StoreCaptureds(captureds)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  updateCaptured$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.UpdateCaptured>(MonthActionTypes.UPDATE_CAPTURED),
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
          mergeMap(() => [new MonthActions.Load()]),
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
    ofType<MonthActions.StoreTransaction>(MonthActionTypes.STORE_TRANSACTION),
    map(() => new MonthActions.UpdateBalance())
  );

  @Effect()
  updateBalance$: Observable<Action> = this.actions$.pipe(
    ofType<MonthActions.UpdateBalance>(MonthActionTypes.UPDATE_BALANCE),
    withLatestFrom(
      this.store.select(MonthSelectors.days),
      this.store.select(MonthSelectors.endingBalance)
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
}
