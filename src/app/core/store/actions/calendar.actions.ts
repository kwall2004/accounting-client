import { Action } from '@ngrx/store';

import { Transaction } from '../../models/transaction';
import { TransactionRequest } from '../../models/transaction-request';
import { Balance } from '../../models/balance';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';

export enum CalendarActionTypes {
  LOAD = '[calendar] LOAD',
  GET_TRANSACTIONS = '[calendar] GET_TRANSACTIONS',
  SET_TRANSACTIONS = '[calendar] SET_TRANSACTIONS',
  PUT_TRANSACTION = '[calendar] PUT_TRANSACTION',
  SET_TRANSACTION = '[calendar] SET_TRANSACTION',
  GET_BALANCES = '[calendar] GET_BALANCES',
  SET_BALANCES = '[calendar] SET_BALANCES',
  GET_CAPTUREDS = '[calendar] GET_CAPTUREDS',
  SET_CAPTUREDS = '[calendar] SET_CAPTUREDS',
  GET_RECURRENCES = '[calendar] GET_RECURRENCES',
  SET_RECURRENCES = '[calendar] SET_RECURRENCES'
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

  export class PutTransaction implements Action {
    readonly type = CalendarActionTypes.PUT_TRANSACTION;

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

  export class GetCaptureds implements Action {
    readonly type = CalendarActionTypes.GET_CAPTUREDS;

    constructor(public payload: TransactionRequest) { }
  }

  export class SetCaptureds implements Action {
    readonly type = CalendarActionTypes.SET_CAPTUREDS;

    constructor(public payload: Captured[]) { }
  }

  export class GetRecurrences implements Action {
    readonly type = CalendarActionTypes.GET_RECURRENCES;
  }

  export class SetRecurrences implements Action {
    readonly type = CalendarActionTypes.SET_RECURRENCES;

    constructor(public payload: Recurrence[]) { }
  }
}

export type CalendarAction =
  CalendarActions.Load |
  CalendarActions.GetTransactions |
  CalendarActions.SetTransactions |
  CalendarActions.PutTransaction |
  CalendarActions.SetTransaction |
  CalendarActions.GetBalances |
  CalendarActions.SetBalances |
  CalendarActions.GetCaptureds |
  CalendarActions.SetCaptureds |
  CalendarActions.GetRecurrences |
  CalendarActions.SetRecurrences;
