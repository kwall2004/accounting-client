import { Action } from '@ngrx/store';

import { Auth } from '../../models/auth';
import { Recurrence } from '../../models/recurrence';

export enum AppActionTypes {
  LOGIN = '[app] LOGIN',
  LOGOUT = '[app] LOGOUT',
  STORE_AUTH = '[app] STORE_AUTH',
  STORE_AUTH_FROM_LOCAL_STORAGE = '[app] STORE_AUTH_FROM_LOCAL_STORAGE',
  PARSE_AUTH_HASH = '[app] PARSE_AUTH_HASH',
  CHECK_AUTH_SESSION = '[app] CHECK_AUTH_SESSION',
  READ_RECURRENCES = '[app] READ_RECURRENCES',
  STORE_RECURRENCES = '[app] STORE_RECURRENCES',
  CREATE_RECURRENCE = '[app] CREATE_RECURRENCE',
  UPDATE_RECURRENCE = '[app] UPDATE_RECURRENCE',
  DELETE_RECURRENCE = '[app] DELETE_RECURRENCE',
  STORE_RECURRENCE = '[app] STORE_RECURRENCE',
  REMOVE_RECURRENCE = '[app] REMOVE_RECURRENCE',
  STORE_LOADING = '[app] STORE_LOADING'
}

export namespace AppActions {
  export class Login implements Action {
    readonly type = AppActionTypes.LOGIN;
  }

  export class Logout implements Action {
    readonly type = AppActionTypes.LOGOUT;
  }

  export class StoreAuth implements Action {
    readonly type = AppActionTypes.STORE_AUTH;

    constructor(public payload: Auth) { }
  }

  export class StoreAuthFromLocalStorage implements Action {
    readonly type = AppActionTypes.STORE_AUTH_FROM_LOCAL_STORAGE;

    constructor(public payload: Auth) { }
  }

  export class ParseAuthHash implements Action {
    readonly type = AppActionTypes.PARSE_AUTH_HASH;

    constructor(public next: Action[]) { }
  }

  export class CheckAuthSession implements Action {
    readonly type = AppActionTypes.CHECK_AUTH_SESSION;

    constructor(public next: Action[]) { }
  }

  export class ReadRecurrences implements Action {
    readonly type = AppActionTypes.READ_RECURRENCES;
  }

  export class StoreRecurrences implements Action {
    readonly type = AppActionTypes.STORE_RECURRENCES;

    constructor(public payload: Recurrence[]) { }
  }

  export class CreateRecurrence implements Action {
    readonly type = AppActionTypes.CREATE_RECURRENCE;

    constructor(public payload: Recurrence) { }
  }

  export class UpdateRecurrence implements Action {
    readonly type = AppActionTypes.UPDATE_RECURRENCE;

    constructor(public payload: Recurrence) { }
  }

  export class DeleteRecurrence implements Action {
    readonly type = AppActionTypes.DELETE_RECURRENCE;

    constructor(public payload: Recurrence) { }
  }

  export class StoreRecurrence implements Action {
    readonly type = AppActionTypes.STORE_RECURRENCE;

    constructor(public payload: Recurrence) { }
  }

  export class RemoveRecurrence implements Action {
    readonly type = AppActionTypes.REMOVE_RECURRENCE;

    constructor(public payload: Recurrence) { }
  }

  export class StoreLoading implements Action {
    readonly type = AppActionTypes.STORE_LOADING;

    constructor(public payload: boolean) { }
  }
}

export type AppAction =
  AppActions.Login |
  AppActions.Logout |
  AppActions.StoreAuth |
  AppActions.StoreAuthFromLocalStorage |
  AppActions.ParseAuthHash |
  AppActions.CheckAuthSession |
  AppActions.ReadRecurrences |
  AppActions.StoreRecurrences |
  AppActions.CreateRecurrence |
  AppActions.UpdateRecurrence |
  AppActions.DeleteRecurrence |
  AppActions.StoreRecurrence |
  AppActions.RemoveRecurrence |
  AppActions.StoreLoading;
