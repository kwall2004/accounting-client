import { createSelector } from '@ngrx/store';

import { calendarFeatureSelector } from '../reducers';
import { State } from '../reducers/calendar.reducer';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';

export namespace CalendarSelectors {
  export const transactions = createSelector(
    calendarFeatureSelector,
    (state: State): Transaction[] => state.transactions
  );

  export const balances = createSelector(
    calendarFeatureSelector,
    (state: State): Balance[] => state.balances
  );
}
