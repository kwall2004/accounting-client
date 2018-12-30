import { Action } from '@ngrx/store';

import { State } from '../reducers/auth.reducer';

export enum AuthActionTypes {
  LOGIN = '[auth] LOGIN',
  LOGOUT = '[auth] LOGOUT',
  SET_DATA = '[auth] SET_DATA',
  SET_DATA_FROM_LOCAL_STORAGE = '[auth] SET_DATA_FROM_LOCAL_STORAGE',
  PARSE_HASH = '[auth] PARSE_HASH',
  CHECK_SESSION = '[auth] CHECK_SESSION'
}

export namespace AuthActions {
  export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;
  }

  export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
  }

  export class SetData implements Action {
    readonly type = AuthActionTypes.SET_DATA;

    constructor(public payload: State) { }
  }

  export class SetDataFromLocalStorage implements Action {
    readonly type = AuthActionTypes.SET_DATA_FROM_LOCAL_STORAGE;

    constructor(public payload: State) { }
  }

  export class ParseHash implements Action {
    readonly type = AuthActionTypes.PARSE_HASH;
  }

  export class CheckSession implements Action {
    readonly type = AuthActionTypes.CHECK_SESSION;
  }
}

export type AuthAction =
  AuthActions.Login |
  AuthActions.Logout |
  AuthActions.SetData |
  AuthActions.SetDataFromLocalStorage |
  AuthActions.ParseHash |
  AuthActions.CheckSession;
