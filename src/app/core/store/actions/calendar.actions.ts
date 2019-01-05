import { Action } from '@ngrx/store';

import { Transaction } from '../../models/transaction';
import { TransactionRequest } from '../../models/transaction-request';
import { Balance } from '../../models/balance';

export enum CalendarActionTypes {
  LOAD = '[calendar] LOAD',
  GET_TRANSACTIONS = '[calendar] GET_TRANSACTIONS',
  SET_TRANSACTIONS = '[calendar] SET_TRANSACTIONS',
  GET_BALANCES = '[calendar] GET_BALANCES',
  SET_BALANCES = '[calendar] SET_BALANCES'
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

  export class GetBalances implements Action {
    readonly type = CalendarActionTypes.GET_BALANCES;

    constructor(public payload: TransactionRequest) { }
  }

  export class SetBalances implements Action {
    readonly type = CalendarActionTypes.SET_BALANCES;

    constructor(public payload: Balance[]) { }
  }
}

export type CalendarAction =
  CalendarActions.Load |
  CalendarActions.GetTransactions |
  CalendarActions.SetTransactions |
  CalendarActions.GetBalances |
  CalendarActions.SetBalances;
