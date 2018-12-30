import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { WebAuth, Auth0DecodedHash, Auth0ParseHashError } from 'auth0-js';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service';
import { AuthActions, AuthActionTypes } from '../actions';

@Injectable()
export class AuthEffects {
  private webAuth = new WebAuth({
    clientID: 'xqhjsag2ozEdVwBcVjFQm7Jx7SlaTqJC',
    domain: 'kwall2004.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200',
    audience: 'https://accounting-api/'
  });

  constructor(
    private actions$: Actions,
    private storage: LocalStorageService,
    private router: Router
  ) { }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    mergeMap(() => {
      this.webAuth.authorize();

      return [];
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    map(() => {
      this.webAuth.logout({
        clientID: 'xqhjsag2ozEdVwBcVjFQm7Jx7SlaTqJC',
        returnTo: 'http://localhost:4200'
      });

      return new AuthActions.SetData({
        accessToken: null,
        idToken: null,
        expiresAt: 0
      });
    })
  );

  @Effect()
  setDataFromLocalStorage$: Observable<Action> = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new AuthActions.SetDataFromLocalStorage({
      accessToken: this.storage.getItem('accessToken'),
      idToken: this.storage.getItem('idToken'),
      expiresAt: Number(this.storage.getItem('expiresAt'))
    }))
  );

  @Effect({ dispatch: false })
  setData$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.SET_DATA),
    tap<AuthActions.SetData>(action => {
      if (action.payload && action.payload.accessToken) {
        this.storage.setItem('accessToken', action.payload.accessToken);
      } else {
        this.storage.removeItem('accessToken');
      }

      if (action.payload && action.payload.idToken) {
        this.storage.setItem('idToken', action.payload.idToken);
      } else {
        this.storage.removeItem('idToken');
      }

      if (action.payload && action.payload.expiresAt) {
        this.storage.setItem('expiresAt', action.payload.expiresAt.toString());
      } else {
        this.storage.removeItem('expiresAt');
      }
    })
  );

  @Effect()
  parseHash$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.PARSE_HASH),
    mergeMap(() => Observable.create((observer: Observer<Auth0DecodedHash>) => {
      this.webAuth.parseHash((err: Auth0ParseHashError, result: Auth0DecodedHash) => {
        if (result && result.accessToken && result.idToken) {
          observer.next(result);
        } else if (err) {
          observer.error(err);
        }
        observer.complete();
      });
    }).pipe(
      mergeMap((result: Auth0DecodedHash) => {
        window.location.hash = '';
        this.router.navigate(['/']);

        return [new AuthActions.SetData({
          accessToken: result.accessToken,
          idToken: result.idToken,
          expiresAt: (result.expiresIn * 1000) + new Date().getTime()
        })];
      }),
      catchError(error => {
        this.router.navigate(['/']);
        console.error(error);

        return [];
      })
    ))
  );

  @Effect()
  checkSession$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_SESSION),
    mergeMap(() => Observable.create((observer: Observer<any>) => {
      this.webAuth.checkSession({}, (err: any, result: any) => {
        if (result && result.accessToken && result.idToken) {
          observer.next(result);
        } else if (err) {
          observer.error(err);
        }
        observer.complete();
      });
    }).pipe(
      mergeMap((result: any) => [new AuthActions.SetData({
        accessToken: result.accessToken,
        idToken: result.idToken,
        expiresAt: (result.expiresIn * 1000) + new Date().getTime()
      })]),
      catchError(error => {
        console.error(error);
        alert(`Could not get a new token (${error.error}: ${error.error_description}).`);

        return [
          new AuthActions.Logout(),
          new AuthActions.SetData({
            accessToken: null,
            idToken: null,
            expiresAt: 0
          })
        ];
      })
    ))
  );
}
