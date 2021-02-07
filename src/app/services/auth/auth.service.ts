<<<<<<< HEAD
import {PublicationInterface} from './../../interfaces/publication-interface';
import {Injectable} from '@angular/core';
=======

import { ProfileInterface } from './../../interfaces/profile-interface';
import { PublicationInterface } from './../../interfaces/publication-interface';
import { Injectable } from '@angular/core';
>>>>>>> cf4d7f87b60e6378b8edff1285c75ca49caa8ad4
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenPayload} from '../../interfaces/TokenPayload';
import {TokenResponse} from '../../interfaces/TokenResponse';
import {map} from 'rxjs/operators';
import {UserInterface} from '../../interfaces/UserInterface';
import { ProfileEmail } from './../../interfaces/profile-email';
import { ProfileLastName } from './../../interfaces/profile-last-name';
import { ProfileFirstName } from './../../interfaces/profile-first-name';
import { ProfileUsername } from './../../interfaces/profile-username';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  // tslint:disable-next-line:ban-types
  private state: Object;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem('userToken', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
    }
    return this.token;
  }

  public getUserDetails(): Observable<any> {
    return this.http.get(environment.api + 'loggedIn');
  }

  public isLoggedIn(): Observable<any> {
    return this.http.get(environment.api + 'loginCheck');
  }

  public navItems(): boolean {
    return localStorage.getItem('value') === 'true';
  }

  public register(user: UserInterface): Observable<any> {
    return this.http.post(environment.api + 'register', user);
  }

<<<<<<< HEAD
=======

  public updateUser(user: ProfileInterface): Observable<any> {
    return this.http.put(environment.api + 'update/user',user);
  }

>>>>>>> cf4d7f87b60e6378b8edff1285c75ca49caa8ad4
  public login(user: UserInterface): Observable<any> {
    const base = this.http.post(`${environment.api}login`, user);

    return base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          this.state = true;
          localStorage.setItem('value', this.state.toString());
        }
      })
    );
  }

  public profile(id): Observable<any> {
    return this.http.get(`${environment.api}getuser/${id}`);
  }

  public getUserId(): Observable<any>{
    return this.http.get(environment.api + 'getId');
  }

  public logout(): void {
    this.state = false;
    window.localStorage.removeItem('value');
    this.token = '';
    window.localStorage.removeItem('userToken');
    this.router.navigateByUrl('/');
  }

}
