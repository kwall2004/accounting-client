import { CalendarActionTypes, CalendarAction } from '../actions/calendar.actions';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import * as moment from 'moment';

export interface State {
  beginDate: Date;
  endDate: Date;
  transactions: Transaction[];
  balances: Balance[];
}

const initialState: State = {
  beginDate: moment().subtract(1, 'month').startOf('month').startOf('day').toDate(),
  endDate: moment().subtract(1, 'month').endOf('month').endOf('day').toDate(),
  transactions: [],
  balances: []
};

export function reducer(state = initialState, action: CalendarAction): State {
  switch (action.type) {
    case CalendarActionTypes.GET_TRANSACTIONS:
      return {
        ...state,
        beginDate: action.payload.beginDate,
        endDate: action.payload.endDate
      };

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
