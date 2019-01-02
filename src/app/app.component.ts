import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CoreState, AppActions } from './core/store';
import { AppSelectors } from './core/store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  authIsExpired$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.authIsExpired$ = this.store.select(AppSelectors.authIsExpired);
    this.loading$ = this.store.select(AppSelectors.loading);
  }

  login() {
    this.store.dispatch(new AppActions.Login());
  }

  logout() {
    this.store.dispatch(new AppActions.Logout());
  }
}
