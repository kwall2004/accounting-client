import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, mergeMap } from 'rxjs/operators';

import { CalendarActions, CalendarActionTypes } from '../actions';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';
import { BalanceService } from '../../services/balance.service';
import { Balance } from '../../models/balance';

@Injectable()
export class CalendarEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private balanceService: BalanceService
  ) { }

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
}
