import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { CoreState, AppActions } from './core/store';
import { AppSelectors } from './core/store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isDestroyed$ = new Subject();
  authIsExpired$: Observable<boolean>;
  loading: boolean;

  constructor(
    private store: Store<CoreState>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authIsExpired$ = this.store.select(AppSelectors.authIsExpired);

    // async pipe for loading wasn't detecting all changes for some reason
    this.store.select(AppSelectors.loading).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(loading => {
      this.loading = loading;
      this.cd.detectChanges();
    });
  }

  login() {
    this.store.dispatch(new AppActions.Login());
  }

  logout() {
    this.store.dispatch(new AppActions.Logout());
  }
}
