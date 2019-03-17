import { Action } from '@ngrx/store';

import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Captured } from '../../models/captured';
import { Day } from '../../models/day';

export enum CalendarActionTypes {
  LOAD = '[calendar] LOAD',
  NEXT_MONTH = '[calendar] NEXT_MONTH',
  PREVIOUS_MONTH = '[calendar] PREVIOUS_MONTH',
  READ_TRANSACTIONS = '[calendar] READ_TRANSACTIONS',
  STORE_TRANSACTIONS = '[calendar] STORE_TRANSACTIONS',
  CREATE_TRANSACTION = '[calendar] CREATE_TRANSACTION',
  UPDATE_TRANSACTION = '[calendar] UPDATE_TRANSACTION',
  DELETE_TRANSACTION = '[calendar] DELETE_TRANSACTION',
  STORE_TRANSACTION = '[calendar] STORE_TRANSACTION',
  REMOVE_TRANSACTION = '[calendar] REMOVE_TRANSACTION',
  READ_BALANCES = '[calendar] READ_BALANCES',
  STORE_BALANCES = '[calendar] STORE_BALANCES',
  UPDATE_BALANCE = '[calendar] UPDATE_BALANCE',
  READ_CAPTUREDS = '[calendar] READ_CAPTUREDS',
  STORE_CAPTUREDS = '[calendar] STORE_CAPTUREDS',
  UPDATE_CAPTURED = '[calendar] UPDATE_CAPTURED',
  READ_BANK_BALANCE = '[calendar] READ_BANK_BALANCE',
  STORE_BANK_BALANCE = '[calendar] STORE_BANK_BALANCE',
  READ_UNCLEARED_TRANSACTIONS = '[calendar] READ_UNCLEARED_TRANSACTIONS',
  STORE_UNCLEARED_BALANCE = '[calendar] STORE_UNCLEARED_BALANCE'
}

export namespace CalendarActions {
  export class Load implements Action {
    readonly type = CalendarActionTypes.LOAD;
  }

  export class NextMonth implements Action {
    readonly type = CalendarActionTypes.NEXT_MONTH;
  }

  export class PreviousMonth implements Action {
    readonly type = CalendarActionTypes.PREVIOUS_MONTH;
  }

  export class ReadTransactions implements Action {
    readonly type = CalendarActionTypes.READ_TRANSACTIONS;
  }

  export class StoreTransactions implements Action {
    readonly type = CalendarActionTypes.STORE_TRANSACTIONS;

    constructor(public payload: Transaction[]) { }
  }

  export class CreateTransaction implements Action {
    readonly type = CalendarActionTypes.CREATE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class UpdateTransaction implements Action {
    readonly type = CalendarActionTypes.UPDATE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class DeleteTransaction implements Action {
    readonly type = CalendarActionTypes.DELETE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class StoreTransaction implements Action {
    readonly type = CalendarActionTypes.STORE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class RemoveTransaction implements Action {
    readonly type = CalendarActionTypes.REMOVE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class ReadBalances implements Action {
    readonly type = CalendarActionTypes.READ_BALANCES;
  }

  export class StoreBalances implements Action {
    readonly type = CalendarActionTypes.STORE_BALANCES;

    constructor(public payload: Balance[]) { }
  }

  export class UpdateBalance implements Action {
    readonly type = CalendarActionTypes.UPDATE_BALANCE;
  }

  export class ReadCaptureds implements Action {
    readonly type = CalendarActionTypes.READ_CAPTUREDS;
  }

  export class StoreCaptureds implements Action {
    readonly type = CalendarActionTypes.STORE_CAPTUREDS;

    constructor(public payload: Captured[]) { }
  }

  export class UpdateCaptured implements Action {
    readonly type = CalendarActionTypes.UPDATE_CAPTURED;

    constructor(public payload: Day[]) { }
  }

  export class ReadBankBalance implements Action {
    readonly type = CalendarActionTypes.READ_BANK_BALANCE;
  }

  export class StoreBankBalance implements Action {
    readonly type = CalendarActionTypes.STORE_BANK_BALANCE;

    constructor(public payload: number) { }
  }

  export class ReadUnclearedTransactions implements Action {
    readonly type = CalendarActionTypes.READ_UNCLEARED_TRANSACTIONS;
  }

  export class StoreUnclearedBalance implements Action {
    readonly type = CalendarActionTypes.STORE_UNCLEARED_BALANCE;

    constructor(public payload: number) { }
  }
}

export type CalendarAction =
  CalendarActions.Load |
  CalendarActions.NextMonth |
  CalendarActions.PreviousMonth |
  CalendarActions.ReadTransactions |
  CalendarActions.StoreTransactions |
  CalendarActions.CreateTransaction |
  CalendarActions.UpdateTransaction |
  CalendarActions.DeleteTransaction |
  CalendarActions.StoreTransaction |
  CalendarActions.RemoveTransaction |
  CalendarActions.ReadBalances |
  CalendarActions.StoreBalances |
  CalendarActions.UpdateBalance |
  CalendarActions.ReadCaptureds |
  CalendarActions.StoreCaptureds |
  CalendarActions.UpdateCaptured |
  CalendarActions.ReadBankBalance |
  CalendarActions.StoreBankBalance |
  CalendarActions.ReadUnclearedTransactions |
  CalendarActions.StoreUnclearedBalance;
