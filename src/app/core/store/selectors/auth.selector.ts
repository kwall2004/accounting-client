import { createSelector } from '@ngrx/store';

import { authFeatureSelector } from '../reducers';
import { State } from '../reducers/auth.reducer';

export namespace AuthSelectors {
  export const token = createSelector(
    authFeatureSelector,
    (state: State): string => state.accessToken
  );

  export const isAuthenticated = createSelector(
    authFeatureSelector,
    (state: State): boolean => new Date().getTime() < state.expiresAt
  );
}
