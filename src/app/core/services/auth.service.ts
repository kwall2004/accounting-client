import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken: string;
  private _accessToken: ReplaySubject<string>;
  private _expiresAt: number;

  private auth0 = new auth0.WebAuth({
    clientID: 'xqhjsag2ozEdVwBcVjFQm7Jx7SlaTqJC',
    domain: 'kwall2004.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200',
    audience: 'https://accounting-api/'
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = new ReplaySubject<string>();
    this._expiresAt = 0;
  }

  get accessToken(): Observable<string> {
    return this._accessToken.asObservable();
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err: any, authResult: { accessToken: any; idToken: any; }) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.error(err);
      }
    });
  }

  private setSession(authResult: { accessToken: any; idToken: any; expiresIn?: any; }): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken.next(authResult.accessToken);
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewSession(): void {
    // tslint:disable-next-line:max-line-length
    this.auth0.checkSession({}, (err: { error: any; error_description: any; }, authResult: { accessToken: any; idToken: any; expiresIn?: any; }) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    this.auth0.logout({
      clientID: 'xqhjsag2ozEdVwBcVjFQm7Jx7SlaTqJC',
      returnTo: 'http://localhost:4200'
    });
    // Remove tokens and expiry time
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }
}
