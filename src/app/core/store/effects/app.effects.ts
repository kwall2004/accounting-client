import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { WebAuth, Auth0DecodedHash, Auth0ParseHashError } from 'auth0-js';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../../environments/environment';
import { LocalStorageService, RecurrenceService } from '../../services';
import { AppActions, AppActionTypes } from '../actions';
import { Recurrence } from '../../models/recurrence';

@Injectable()
export class AppEffects {
  private webAuth = new WebAuth({
    clientID: 'xqhjsag2ozEdVwBcVjFQm7Jx7SlaTqJC',
    domain: 'kwall2004.auth0.com',
    responseType: 'token id_token',
    redirectUri: environment.webAuthRedirectUri,
    audience: 'https://accounting-api/'
  });

  constructor(
    private actions$: Actions,
    private storage: LocalStorageService,
    private recurrenceService: RecurrenceService,
    private toastrService: ToastrService
  ) { }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.LOGIN),
    mergeMap(() => {
      this.webAuth.authorize();

      return [];
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.LOGOUT),
    map(() => {
      this.webAuth.logout({
        clientID: 'xqhjsag2ozEdVwBcVjFQm7Jx7SlaTqJC',
        returnTo: environment.webAuthLogoutReturnTo
      });

      return new AppActions.StoreAuth({
        accessToken: null,
        idToken: null,
        expiresAt: 0
      });
    })
  );

  @Effect()
  storeAuthFromLocalStorage$: Observable<Action> = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new AppActions.StoreAuthFromLocalStorage({
      accessToken: this.storage.getItem('accessToken'),
      idToken: this.storage.getItem('idToken'),
      expiresAt: Number(this.storage.getItem('expiresAt'))
    }))
  );

  @Effect({ dispatch: false })
  storeAuth$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.STORE_AUTH),
    tap<AppActions.StoreAuth>(action => {
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
  parseAuthHash$: Observable<Action> = this.actions$.pipe(
    ofType<AppActions.ParseAuthHash>(AppActionTypes.PARSE_AUTH_HASH),
    mergeMap(action => Observable.create((observer: Observer<Auth0DecodedHash>) => {
      this.webAuth.parseHash((err: Auth0ParseHashError, result: Auth0DecodedHash) => {
        if (result && result.accessToken && result.idToken) {
          observer.next(result);
        } else if (err) {
          observer.error(err);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    }).pipe(
      mergeMap((result: Auth0DecodedHash): Action[] => {
        if (result) {
          window.location.hash = '';

          return [
            new AppActions.StoreAuth({
              accessToken: result.accessToken,
              idToken: result.idToken,
              expiresAt: (result.expiresIn * 1000) + new Date().getTime()
            }),
            ...action.next
          ];
        }

        return [new AppActions.CheckAuthSession(action.next)];
      }),
      catchError(error => {
        console.error(error);

        return [];
      })
    ))
  );

  @Effect()
  checkAuthSession$: Observable<Action> = this.actions$.pipe(
    ofType<AppActions.CheckAuthSession>(AppActionTypes.CHECK_AUTH_SESSION),
    mergeMap(action => Observable.create((observer: Observer<any>) => {
      this.webAuth.checkSession({}, (err: any, result: any) => {
        if (result && result.accessToken && result.idToken) {
          observer.next(result);
        } else if (err) {
          observer.error(err);
        }
        observer.complete();
      });
    }).pipe(
      mergeMap((result: any): Action[] => [
        new AppActions.StoreAuth({
          accessToken: result.accessToken,
          idToken: result.idToken,
          expiresAt: (result.expiresIn * 1000) + new Date().getTime()
        }),
        ...action.next
      ]),
      catchError(error => {
        console.error(error);
        alert(`Could not get a new token (${error.error}: ${error.error_description}).`);

        return [
          new AppActions.Logout(),
          new AppActions.StoreAuth({
            accessToken: null,
            idToken: null,
            expiresAt: 0
          })
        ];
      })
    ))
  );

  @Effect()
  readRecurrences$: Observable<Action> = this.actions$.pipe(
    ofType<AppActions.ReadRecurrences>(AppActionTypes.READ_RECURRENCES),
    mergeMap(() => this.recurrenceService.get().pipe(
      mergeMap((recurrences: Recurrence[]) => [new AppActions.StoreRecurrences(recurrences)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  createRecurrence$: Observable<Action> = this.actions$.pipe(
    ofType<AppActions.CreateRecurrence>(AppActionTypes.CREATE_RECURRENCE),
    mergeMap(action => this.recurrenceService.post(action.payload).pipe(
      mergeMap((recurrence: Recurrence) => [new AppActions.StoreRecurrence(recurrence)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  updateRecurrence$: Observable<Action> = this.actions$.pipe(
    ofType<AppActions.UpdateRecurrence>(AppActionTypes.UPDATE_RECURRENCE),
    mergeMap(action => this.recurrenceService.patch(action.payload).pipe(
      mergeMap((recurrence: Recurrence) => [new AppActions.StoreRecurrence(recurrence)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );

  @Effect()
  deleteRecurrence$: Observable<Action> = this.actions$.pipe(
    ofType<AppActions.DeleteRecurrence>(AppActionTypes.DELETE_RECURRENCE),
    mergeMap(action => this.recurrenceService.delete(action.payload).pipe(
      mergeMap(() => [new AppActions.RemoveRecurrence(action.payload)]),
      catchError(error => {
        console.error(error);
        this.toastrService.error(error.message || JSON.stringify(error));
        return [];
      })
    ))
  );
}
