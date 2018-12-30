import { AuthActionTypes, AuthAction } from '../actions/auth.actions';

export interface State {
  accessToken: string;
  idToken: string;
  expiresAt: number;
}

const initialState: State = {
  accessToken: null,
  idToken: null,
  expiresAt: 0
};

export function reducer(state = initialState, action: AuthAction): State {
  switch (action.type) {
    case AuthActionTypes.SET_DATA:
    case AuthActionTypes.SET_DATA_FROM_LOCAL_STORAGE:
      return {
        ...state,
        ...action.payload
      };
  }

  return state;
}
