import { CalendarActionTypes, CalendarAction } from '../actions/calendar.actions';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';

export interface State {
  transactions: Transaction[];
  balances: Balance[];
}

const initialState: State = {
  transactions: [],
  balances: []
};

export function reducer(state = initialState, action: CalendarAction): State {
  switch (action.type) {
    case CalendarActionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };

    case CalendarActionTypes.SET_BALANCES:
      return {
        ...state,
        balances: action.payload
      };
  }

  return state;
}
