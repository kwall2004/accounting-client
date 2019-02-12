import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Recurrence } from '../../core/models/recurrence';
import { CoreState, AppSelectors } from '../../core/store';

@Component({
  selector: 'app-recurrences',
  templateUrl: './recurrences.component.html',
  styleUrls: ['./recurrences.component.scss']
})
export class RecurrencesComponent implements OnInit {
  recurrences$: Observable<Recurrence[]>;

  columns = ['description', 'amount'];

  constructor(
    private store: Store<CoreState>
  ) { }

  ngOnInit() {
    this.recurrences$ = this.store.select(AppSelectors.recurrences);
  }
}
