import { Action } from '@ngrx/store';

import { Transaction } from '../../models/transaction';
import { TransactionRequest } from '../../models/transaction-request';
import { Balance } from '../../models/balance';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';
import { Day } from '../../models/day';

export enum CalendarActionTypes {
  LOAD = '[calendar] LOAD',
  GET_TRANSACTIONS = '[calendar] GET_TRANSACTIONS',
  SET_TRANSACTIONS = '[calendar] SET_TRANSACTIONS',
  PATCH_TRANSACTION = '[calendar] PATCH_TRANSACTION',
  SET_TRANSACTION = '[calendar] SET_TRANSACTION',
  GET_BALANCES = '[calendar] GET_BALANCES',
  SET_BALANCES = '[calendar] SET_BALANCES',
  GET_CAPTURED = '[calendar] GET_CAPTURED',
  SET_CAPTURED = '[calendar] SET_CAPTURED',
  GET_RECURRENCES = '[calendar] GET_RECURRENCES',
  SET_RECURRENCES = '[calendar] SET_RECURRENCES',
  CAPTURE_MONTH = '[calendar] CAPTURE_MONTH'
}

export namespace CalendarActions {
  export class Load implements Action {
    readonly type = CalendarActionTypes.LOAD;

    constructor(public payload: TransactionRequest) { }
  }

  export class GetTransactions implements Action {
    readonly type = CalendarActionTypes.GET_TRANSACTIONS;

    constructor(public payload: TransactionRequest) { }
  }

  export class SetTransactions implements Action {
    readonly type = CalendarActionTypes.SET_TRANSACTIONS;

    constructor(public payload: Transaction[]) { }
  }

  export class PatchTransaction implements Action {
    readonly type = CalendarActionTypes.PATCH_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class SetTransaction implements Action {
    readonly type = CalendarActionTypes.SET_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class GetBalances implements Action {
    readonly type = CalendarActionTypes.GET_BALANCES;

    constructor(public payload: TransactionRequest) { }
  }

  export class SetBalances implements Action {
    readonly type = CalendarActionTypes.SET_BALANCES;

    constructor(public payload: Balance[]) { }
  }

  export class GetCaptured implements Action {
    readonly type = CalendarActionTypes.GET_CAPTURED;

    constructor(public payload: TransactionRequest) { }
  }

  export class SetCaptured implements Action {
    readonly type = CalendarActionTypes.SET_CAPTURED;

    constructor(public payload: Captured[]) { }
  }

  export class GetRecurrences implements Action {
    readonly type = CalendarActionTypes.GET_RECURRENCES;
  }

  export class SetRecurrences implements Action {
    readonly type = CalendarActionTypes.SET_RECURRENCES;

    constructor(public payload: Recurrence[]) { }
  }

  export class CaptureMonth implements Action {
    readonly type = CalendarActionTypes.CAPTURE_MONTH;

    constructor(
      public payload: Day[][],
      public next: Action[]
    ) { }
  }
}

export type CalendarAction =
  CalendarActions.Load |
  CalendarActions.GetTransactions |
  CalendarActions.SetTransactions |
  CalendarActions.PatchTransaction |
  CalendarActions.SetTransaction |
  CalendarActions.GetBalances |
  CalendarActions.SetBalances |
  CalendarActions.GetCaptured |
  CalendarActions.SetCaptured |
  CalendarActions.GetRecurrences |
  CalendarActions.SetRecurrences |
  CalendarActions.CaptureMonth;
