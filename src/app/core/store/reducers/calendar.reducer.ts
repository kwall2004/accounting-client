import * as moment from 'moment';

import { CalendarActionTypes, CalendarAction } from '../actions/calendar.actions';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';

export interface State {
  beginDate: Date;
  endDate: Date;
  transactions: Transaction[];
  balances: Balance[];
  captureds: Captured[];
  recurrences: Recurrence[];
}

const initialState: State = {
  beginDate: moment().subtract(1, 'month').startOf('month').startOf('day').toDate(),
  endDate: moment().subtract(1, 'month').endOf('month').endOf('day').toDate(),
  transactions: [],
  balances: [],
  captureds: [{ date: moment().subtract(1, 'month').startOf('month').startOf('day').toDate() }],
  recurrences: []
};

export function reducer(state = initialState, action: CalendarAction): State {
  switch (action.type) {
    case CalendarActionTypes.LOAD:
      return {
        ...state,
        transactions: [],
        balances: [],
        captureds: [{ date: action.payload.beginDate }]
      };

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

    case CalendarActionTypes.SET_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((t: Transaction) => {
          if (t.id === action.payload.id) {
            return action.payload;
          }
          return t;
        })
      };

    case CalendarActionTypes.SET_BALANCES:
      return {
        ...state,
        balances: action.payload
      };

    case CalendarActionTypes.SET_CAPTURED:
      return {
        ...state,
        captureds: action.payload
      };

    case CalendarActionTypes.SET_RECURRENCES:
      return {
        ...state,
        recurrences: action.payload
      };
  }

  return state;
}
