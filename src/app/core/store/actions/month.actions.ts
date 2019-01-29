import { Action } from '@ngrx/store';

import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Captured } from '../../models/captured';
import { Day } from '../../models/day';

export enum MonthActionTypes {
  LOAD = '[month] LOAD',
  NEXT_MONTH = '[month] NEXT_MONTH',
  PREVIOUS_MONTH = '[month] PREVIOUS_MONTH',
  READ_TRANSACTIONS = '[month] READ_TRANSACTIONS',
  STORE_TRANSACTIONS = '[month] STORE_TRANSACTIONS',
  CREATE_TRANSACTION = '[month] CREATE_TRANSACTION',
  UPDATE_TRANSACTION = '[month] UPDATE_TRANSACTION',
  STORE_TRANSACTION = '[month] STORE_TRANSACTION',
  READ_BALANCES = '[month] READ_BALANCES',
  STORE_BALANCES = '[month] STORE_BALANCES',
  UPDATE_BALANCE = '[month] UPDATE_BALANCE',
  READ_CAPTUREDS = '[month] READ_CAPTUREDS',
  STORE_CAPTUREDS = '[month] STORE_CAPTUREDS',
  UPDATE_CAPTURED = '[month] UPDATE_CAPTURED'
}

export namespace MonthActions {
  export class Load implements Action {
    readonly type = MonthActionTypes.LOAD;
  }

  export class NextMonth implements Action {
    readonly type = MonthActionTypes.NEXT_MONTH;
  }

  export class PreviousMonth implements Action {
    readonly type = MonthActionTypes.PREVIOUS_MONTH;
  }

  export class ReadTransactions implements Action {
    readonly type = MonthActionTypes.READ_TRANSACTIONS;
  }

  export class StoreTransactions implements Action {
    readonly type = MonthActionTypes.STORE_TRANSACTIONS;

    constructor(public payload: Transaction[]) { }
  }

  export class CreateTransaction implements Action {
    readonly type = MonthActionTypes.CREATE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class UpdateTransaction implements Action {
    readonly type = MonthActionTypes.UPDATE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class StoreTransaction implements Action {
    readonly type = MonthActionTypes.STORE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class ReadBalances implements Action {
    readonly type = MonthActionTypes.READ_BALANCES;
  }

  export class StoreBalances implements Action {
    readonly type = MonthActionTypes.STORE_BALANCES;

    constructor(public payload: Balance[]) { }
  }

  export class UpdateBalance implements Action {
    readonly type = MonthActionTypes.UPDATE_BALANCE;
  }

  export class ReadCaptureds implements Action {
    readonly type = MonthActionTypes.READ_CAPTUREDS;
  }

  export class StoreCaptureds implements Action {
    readonly type = MonthActionTypes.STORE_CAPTUREDS;

    constructor(public payload: Captured[]) { }
  }

  export class UpdateCaptured implements Action {
    readonly type = MonthActionTypes.UPDATE_CAPTURED;

    constructor(public payload: Day[]) { }
  }
}

export type MonthAction =
  MonthActions.Load |
  MonthActions.NextMonth |
  MonthActions.PreviousMonth |
  MonthActions.ReadTransactions |
  MonthActions.StoreTransactions |
  MonthActions.CreateTransaction |
  MonthActions.UpdateTransaction |
  MonthActions.StoreTransaction |
  MonthActions.ReadBalances |
  MonthActions.StoreBalances |
  MonthActions.UpdateBalance |
  MonthActions.ReadCaptureds |
  MonthActions.StoreCaptureds |
  MonthActions.UpdateCaptured;
