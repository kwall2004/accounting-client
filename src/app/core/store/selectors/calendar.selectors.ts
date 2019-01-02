import { createSelector } from '@ngrx/store';
import * as moment from 'moment';

import { calendarFeatureSelector } from '../reducers';
import { State } from '../reducers/calendar.reducer';
import { Balance } from '../../models/balance';
import { Day } from '../../models/day';
import { Transaction } from '../../models/transaction';

export namespace CalendarSelectors {
  export const beginDate = createSelector(
    calendarFeatureSelector,
    (state: State): Date => state.beginDate
  );

  export const endDate = createSelector(
    calendarFeatureSelector,
    (state: State): Date => state.endDate
  );

  export const monthName = createSelector(
    beginDate,
    (beginDate1): string => moment(beginDate1).format('MMMM YYYY')
  );

  export const transactions = createSelector(
    calendarFeatureSelector,
    (state: State): Transaction[] => state.transactions
  );

  export const weeks = createSelector(
    beginDate,
    endDate,
    transactions,
    (beginDate1: Date, endDate1: Date, transactions1: Transaction[]): Day[][] => {
      const days = new Array<Day>();

      days.push(...new Array(moment(beginDate1).day())
        .fill(moment(beginDate1))
        .map((date, index): Day => ({
          date: date.clone().subtract(date.day() - index, 'days').toDate(),
          transactions: [],
          disabled: true
        })));

      for (let date = moment(beginDate1).clone(); date <= moment(endDate1); date = date.add(1, 'days')) {
        days.push({
          date: date.toDate(),
          transactions: transactions1.filter(t => date.isSame(t.date, 'day'))
        });
      }

      days.push(...new Array(6 - moment(endDate1).day())
        .fill(moment(endDate1))
        .map((date, index): Day => ({
          date: date.clone().add(index + 1, 'days').toDate(),
          transactions: [],
          disabled: true
        })));

      return days.reduce((result: Day[][], day) => {
        if (result.length === 0 || result[result.length - 1].length === 7) {
          result.push([]);
        }

        result[result.length - 1].push(day);

        return result;
      }, []);
    }
  );

  export const balances = createSelector(
    calendarFeatureSelector,
    (state: State): Balance[] => state.balances
  );

  export const previousMonthEndBalance = createSelector(
    balances,
    (balances1: Balance[]): number => balances1.length && balances1[0].amount
  );
}
