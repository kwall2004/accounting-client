import { Action } from '@ngrx/store';
import { Auth } from '../../models/auth';

export enum AppActionTypes {
  LOGIN = '[app] LOGIN',
  LOGOUT = '[app] LOGOUT',
  SET_AUTH = '[app] SET_AUTH',
  SET_AUTH_FROM_LOCAL_STORAGE = '[app] SET_AUTH_FROM_LOCAL_STORAGE',
  PARSE_AUTH_HASH = '[app] PARSE_AUTH_HASH',
  CHECK_AUTH_SESSION = '[app] CHECK_AUTH_SESSION',
  SET_LOADING = '[app] SET_LOADING'
}

export namespace AppActions {
  export class Login implements Action {
    readonly type = AppActionTypes.LOGIN;
  }

  export class Logout implements Action {
    readonly type = AppActionTypes.LOGOUT;
  }

  export class SetAuth implements Action {
    readonly type = AppActionTypes.SET_AUTH;

    constructor(public payload: Auth) { }
  }

  export class SetAuthFromLocalStorage implements Action {
    readonly type = AppActionTypes.SET_AUTH_FROM_LOCAL_STORAGE;

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

  export class SetLoading implements Action {
    readonly type = AppActionTypes.SET_LOADING;

    constructor(public payload: boolean) { }
  }
}

export type AppAction =
  AppActions.Login |
  AppActions.Logout |
  AppActions.SetAuth |
  AppActions.SetAuthFromLocalStorage |
  AppActions.ParseAuthHash |
  AppActions.CheckAuthSession |
  AppActions.SetLoading;
