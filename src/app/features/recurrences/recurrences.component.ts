import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Recurrence } from '../../core/models/recurrence';
import { CoreState, AppSelectors, AppActions, CalendarActions } from '../../core/store';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-recurrences',
  templateUrl: './recurrences.component.html',
  styleUrls: ['./recurrences.component.scss']
})
export class RecurrencesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private isDestroyed$ = new Subject();

  recurrences: MatTableDataSource<Recurrence>;

  columns = [
    'description',
    'amount',
    'weekly-frequency',
    'weekly-day',
    'monthly-frequency',
    'monthly-date'
  ];

  constructor(
    private store: Store<CoreState>
  ) { }

  ngOnInit() {
    this.store.select(AppSelectors.recurrences).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(recurrences => {
      this.recurrences = new MatTableDataSource(recurrences);
      this.recurrences.paginator = this.paginator;
    });

    this.store.dispatch(new AppActions.ParseAuthHash([
      new AppActions.ReadRecurrences()
    ]));
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }
}
