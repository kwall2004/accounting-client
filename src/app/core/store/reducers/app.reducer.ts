import { AppActionTypes, AppAction } from '../actions/app.actions';
import { Auth } from '../../models/auth';

export interface State {
  auth: Auth;
  loading: number;
}

const initialState: State = {
  auth: {
    accessToken: null,
    idToken: null,
    expiresAt: 0
  },
  loading: 0
};

export function reducer(state = initialState, action: AppAction): State {
  switch (action.type) {
    case AppActionTypes.SET_AUTH:
    case AppActionTypes.SET_AUTH_FROM_LOCAL_STORAGE:
      return {
        ...state,
        auth: action.payload
      };
    case AppActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload ? state.loading + 1 : state.loading - 1
      };
  }

  return state;
}
