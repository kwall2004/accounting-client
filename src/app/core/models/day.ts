import { Transaction } from './transaction';
import { Recurrence } from './recurrence';

export interface Day {
  date: Date;
  transactions: Transaction[];
  balance: number;
  recurrences: Recurrence[];
  disabled?: boolean;
}
