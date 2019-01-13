import { createSelector } from '@ngrx/store';

import { appFeatureSelector } from '../reducers';
import { State } from '../reducers/app.reducer';
import { Auth } from '../../models/auth';

export namespace AppSelectors {
  export const auth = createSelector(
    appFeatureSelector,
    (state: State): Auth => state.auth
  );

  export const authToken = createSelector(
    auth,
    (auth1: Auth): string => auth1.accessToken
  );

  export const authIsExpired = createSelector(
    auth,
    (auth1: Auth): boolean => new Date().getTime() >= auth1.expiresAt
  );

  export const loading = createSelector(
    appFeatureSelector,
    (state: State): boolean => state.loading > 0
  );
}
