import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { LocalStorageService } from './core/services/local-storage.service';
import { CoreState, AuthActions } from './core/store';
import { AuthSelectors } from './core/store/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private storage: LocalStorageService,
    private store: Store<CoreState>
  ) {
    this.store.dispatch(new AuthActions.ParseHash());
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(AuthSelectors.isAuthenticated);

    if (this.storage.getItem('accessToken')) {
      this.store.dispatch(new AuthActions.CheckSession());
    }
  }

  login() {
    this.store.dispatch(new AuthActions.Login());
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
