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
  AppActions.StoreLoading;
