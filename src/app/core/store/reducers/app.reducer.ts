import { AppActionTypes, AppAction } from '../actions/app.actions';
import { Auth } from '../../models/auth';
import { Recurrence } from '../../models/recurrence';

export interface State {
  auth: Auth;
  recurrences: Recurrence[];
  loading: number;
}

const initialState: State = {
  auth: {
    accessToken: null,
    idToken: null,
    expiresAt: 0
  },
  recurrences: [],
  loading: 0
};

export function reducer(state = initialState, action: AppAction): State {
  switch (action.type) {
    case AppActionTypes.STORE_AUTH:
    case AppActionTypes.STORE_AUTH_FROM_LOCAL_STORAGE:
      return {
        ...state,
        auth: action.payload
      };

    case AppActionTypes.STORE_RECURRENCES:
      return {
        ...state,
        recurrences: action.payload
      };

    case AppActionTypes.STORE_LOADING:
      return {
        ...state,
        loading: action.payload ? state.loading + 1 : state.loading - 1
      };
  }

  return state;
}
