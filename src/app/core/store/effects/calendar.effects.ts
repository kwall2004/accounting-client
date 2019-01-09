import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, mergeMap } from 'rxjs/operators';

import { CalendarActions, CalendarActionTypes } from '../actions';
import { TransactionService, BalanceService, CapturedService, RecurrenceService } from '../../services';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Captured } from '../../models/captured';
import { Recurrence } from '../../models/recurrence';

@Injectable()
export class CalendarEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private balanceService: BalanceService,
    private capturedService: CapturedService,
    private recurrenceService: RecurrenceService
  ) { }

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.Load>(CalendarActionTypes.LOAD),
    mergeMap(action => [
      new CalendarActions.GetCaptureds(action.payload),
      new CalendarActions.GetTransactions(action.payload),
      new CalendarActions.GetBalances(action.payload)
    ])
  );

  @Effect()
  getTransactions$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetTransactions>(CalendarActionTypes.GET_TRANSACTIONS),
    mergeMap(action => this.transactionService.get(action.payload).pipe(
      mergeMap((transactions: Transaction[]) => {
        return [new CalendarActions.SetTransactions(transactions)];
      }),
      catchError(error => {
        console.error(error);
        return [];
      })
    ))
  );

  @Effect()
  patchTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.PatchTransaction>(CalendarActionTypes.PATCH_TRANSACTION),
    mergeMap(action => this.transactionService.patch(action.payload).pipe(
      mergeMap((transaction: Transaction) => {
        return [new CalendarActions.SetTransaction(transaction)];
      }),
      catchError(error => {
        console.error(error);
        return [];
      })
    ))
  );

  @Effect()
  getBalances$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetBalances>(CalendarActionTypes.GET_BALANCES),
    mergeMap(action => this.balanceService.get(action.payload).pipe(
      mergeMap((balances: Balance[]) => {
        return [new CalendarActions.SetBalances(balances)];
      }),
      catchError(error => {
        console.error(error);
        return [];
      })
    ))
  );

  @Effect()
  getCaptured$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetCaptureds>(CalendarActionTypes.GET_CAPTUREDS),
    mergeMap(action => this.capturedService.get(action.payload).pipe(
      mergeMap((captureds: Captured[]) => {
        return [new CalendarActions.SetCaptureds(captureds)];
      }),
      catchError(error => {
        console.error(error);
        return [];
      })
    ))
  );

  @Effect()
  getRecurrences$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetRecurrences>(CalendarActionTypes.GET_RECURRENCES),
    mergeMap(() => this.recurrenceService.get().pipe(
      mergeMap((recurrences: Recurrence[]) => {
        return [new CalendarActions.SetRecurrences(recurrences)];
      }),
      catchError(error => {
        console.error(error);
        return [];
      })
    ))
  );
}
