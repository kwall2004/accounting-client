import { createSelector } from '@ngrx/store';
import * as moment from 'moment';

import { calendarFeatureSelector } from '../reducers';
import { State } from '../reducers/calendar.reducer';
import { Balance } from '../../models/balance';
import { Day } from '../../models/day';
import { Transaction } from '../../models/transaction';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';

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

  export const balances = createSelector(
    calendarFeatureSelector,
    (state: State): Balance[] => state.balances
  );

  export const beginningBalance = createSelector(
    balances,
    (balances1: Balance[]): number => balances1.length && balances1[0].amount
  );

  export const captureds = createSelector(
    calendarFeatureSelector,
    (state: State): Captured[] => state.captureds
  );

  export const captured = createSelector(
    captureds,
    (captureds1: Captured[]): boolean => captureds1.length > 0
  );

  export const recurrences = createSelector(
    calendarFeatureSelector,
    (state: State): Recurrence[] => state.recurrences
  );

  export const weeks = createSelector(
    beginDate,
    endDate,
    transactions,
    beginningBalance,
    captured,
    recurrences,
    (beginDate1: Date, endDate1: Date, transactions1: Transaction[], beginningBalance1: number, captured1: boolean, recurrences1: Recurrence[]): Day[][] => {
      const days = new Array<Day>();

      days.push(...new Array(moment(beginDate1).day())
        .fill(moment(beginDate1))
        .map((date, index): Day => ({
          date: date.clone().subtract(date.day() - index, 'days').toDate(),
          transactions: [],
          balance: 0,
          recurrences: [],
          disabled: true
        })));

      let dayBalance = beginningBalance1;
      for (let date = moment(beginDate1).clone(); date <= moment(endDate1); date = date.add(1, 'days')) {
        const dayTransactions = transactions1.filter(t => date.isSame(moment(t.date), 'day'));

        const dayRecurrences = !captured1 ? recurrences1.filter(r => {
          if (date.isSameOrAfter(moment(r.startDate), 'day') && (!r.endDate || date.isSameOrBefore(moment(r.endDate), 'day'))) {
            if (r.monthlyFrequency) {
              if (r.monthlyFrequency === 1) {
                return r.monthlyDate && date.date() === r.monthlyDate;
              } else {
                for (const loopDate = moment(r.startDate).clone(); loopDate <= date; loopDate.add(r.monthlyFrequency, 'months')) {
                  return r.monthlyDate && loopDate.month() === date.month() && date.date() === r.monthlyDate;
                }
              }
            }

            if (r.weeklyFrequency) {
              if (r.weeklyFrequency === 1) {
                return r.weeklyDay && date.format('dddd') === r.weeklyDay;
              } else {
                for (const loopDate = moment(r.startDate).clone(); loopDate <= date; loopDate.add(r.weeklyFrequency, 'weeks')) {
                  return r.weeklyDay && loopDate.week() === date.week() && date.format('dddd') === r.weeklyDay;
                }
              }
            }
          }

          return false;
        }) : [];

        dayBalance += dayTransactions.reduce((total, t) => total + t.amount, 0) + dayRecurrences.reduce((total, r) => total + r.amount, 0);

        days.push({
          date: date.toDate(),
          transactions: dayTransactions,
          balance: dayBalance,
          recurrences: dayRecurrences
        });
      }

      days.push(...new Array(6 - moment(endDate1).day())
        .fill(moment(endDate1))
        .map((date, index): Day => ({
          date: date.clone().add(index + 1, 'days').toDate(),
          transactions: [],
          balance: 0,
          recurrences: [],
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
}
