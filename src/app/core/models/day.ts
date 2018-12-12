import { Transaction } from './transaction';

export interface Day {
    date: Date;
    transactions: Transaction[];
    disabled?: boolean;
}
