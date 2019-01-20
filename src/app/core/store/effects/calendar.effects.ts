import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { CalendarActions, CalendarActionTypes } from '../actions';
import { TransactionService, BalanceService, CapturedService, RecurrenceService, TransactionsService } from '../../services';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Captured } from '../../models/captured';
import { Recurrence } from '../../models/recurrence';
import { Day } from '../../models/day';

@Injectable()
export class CalendarEffects {
  constructor(
    private actions$: Actions,
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
    mergeMap(action => [
      new CalendarActions.GetCaptured(action.payload),
      new CalendarActions.GetTransactions(action.payload),
      new CalendarActions.GetBalances(action.payload)
    ])
  );

  @Effect()
  getTransactions$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetTransactions>(CalendarActionTypes.GET_TRANSACTIONS),
    mergeMap(action => this.transactionService.get(action.payload).pipe(
      mergeMap((transactions: Transaction[]) => [new CalendarActions.SetTransactions(transactions)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  patchTransaction$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.PatchTransaction>(CalendarActionTypes.PATCH_TRANSACTION),
    mergeMap(action => this.transactionService.patch(action.payload).pipe(
      mergeMap((transaction: Transaction) => [new CalendarActions.SetTransaction(transaction)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  getBalances$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetBalances>(CalendarActionTypes.GET_BALANCES),
    mergeMap(action => this.balanceService.get(action.payload).pipe(
      mergeMap((balances: Balance[]) => [new CalendarActions.SetBalances(balances)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  getCaptureds$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetCaptured>(CalendarActionTypes.GET_CAPTURED),
    mergeMap(action => this.capturedService.get(action.payload).pipe(
      mergeMap((captureds: Captured[]) => [new CalendarActions.SetCaptured(captureds)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  getRecurrences$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.GetRecurrences>(CalendarActionTypes.GET_RECURRENCES),
    mergeMap(() => this.recurrenceService.get().pipe(
      mergeMap((recurrences: Recurrence[]) => [new CalendarActions.SetRecurrences(recurrences)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  captureMonth$: Observable<Action> = this.actions$.pipe(
    ofType<CalendarActions.CaptureMonth>(CalendarActionTypes.CAPTURE_MONTH),
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
          mergeMap(() => action.next),
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
}
