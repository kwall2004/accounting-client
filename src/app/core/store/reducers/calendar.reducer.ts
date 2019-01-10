import * as moment from 'moment';

import { CalendarActionTypes, CalendarAction, CalendarActions } from '../actions/calendar.actions';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';
import { Day } from '../../models/day';

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

    case CalendarActionTypes.SET_CAPTUREDS:
      return {
        ...state,
        captureds: action.payload
      };

    case CalendarActionTypes.SET_RECURRENCES:
      return {
        ...state,
        recurrences: action.payload
      };

    case CalendarActionTypes.CAPTURE_MONTH:
      return {
        ...state,
        captureds: [{ date: action.payload[0][0].date }],
        transactions: [
          ...state.transactions,
          ...action.payload.reduce((weekTransactions: Transaction[], week: Day[]): Transaction[] => [
            ...weekTransactions,
            ...week.reduce((dayTransactions: Transaction[], day: Day): Transaction[] => [
              ...dayTransactions,
              ...day.recurrences.map((r): Transaction => ({
                id: 0,
                date: day.date,
                description: r.description,
                category: r.category,
                amount: r.amount,
                cleared: false
              }))
            ], [])
          ], [])
        ]
      };
  }

  return state;
}
