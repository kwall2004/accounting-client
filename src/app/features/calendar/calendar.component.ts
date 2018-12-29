import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

import { TransactionService } from 'src/app/core/services/transaction.service';
import { Transaction } from 'src/app/core/models/transaction';
import { Day } from 'src/app/core/models/day';
import { BalanceService } from 'src/app/core/services/balance.service';
import { Balance } from 'src/app/core/models/balance';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  monthName: string;
  monthBalance: number;
  weeks: Day[][];

  constructor(
    private transactionService: TransactionService,
    private balanceService: BalanceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const beginDate = moment().startOf('month');
    const endDate = moment().endOf('month');
    const days = new Array<Day>();

    this.monthName = beginDate.format('MMMM YYYY');

    this.transactionService.get({
      from: beginDate.toDate(),
      to: endDate.toDate()
    }).pipe(take(1)).subscribe((transactions: Transaction[]) => {
      const firstDateOfMonth = moment(beginDate);
      const lastDateOfMonth = moment(endDate);

      days.push(...new Array(firstDateOfMonth.day())
        .fill(firstDateOfMonth.clone())
        .map((date, index): Day => ({
          date: date.clone().subtract(date.day() - index, 'days').toDate(),
          transactions: [],
          disabled: true
        })));

      for (let date = moment(beginDate); date <= moment(endDate); date = date.clone().add(1, 'days')) {
        days.push({
          date: date.toDate(),
          transactions: transactions.filter(t => date.isSame(t.date, 'day'))
        });
      }

      days.push(...new Array(6 - lastDateOfMonth.day())
        .fill(lastDateOfMonth.clone())
        .map((date, index): Day => ({
          date: date.clone().add(index + 1, 'days').toDate(),
          transactions: [],
          disabled: true
        })));

      this.weeks = days.reduce((weeks: Day[][], day) => {
        if (weeks.length === 0 || weeks[weeks.length - 1].length === 7) {
          weeks.push([]);
        }

        weeks[weeks.length - 1].push(day);

        return weeks;
      }, []);
    });

    this.balanceService.read({
      to: beginDate.subtract(1, 'day').toDate()
    }).pipe(take(1)).subscribe((balances: Balance[]) => {
      this.monthBalance = balances[0].balanceAmount;
    });
  }

  onDayClick() {
    this.authService.login();
  }
}
