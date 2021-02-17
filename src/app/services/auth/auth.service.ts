import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenResponse} from '../../interfaces/TokenResponse';
import {map} from 'rxjs/operators';
import {UserInterface} from '../../interfaces/UserInterface';
import {UserDetails} from '../../interfaces/user-details';
import {CookieService} from 'ngx-cookie-service';
import {TokenPayload} from '../../interfaces/TokenPayload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private refreshToken: string;
  // tslint:disable-next-line:ban-types
  private state: Object;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
  }

  // private saveToken(token: string): void {
  //   this.cookieService.set('token', token, {expires: 10});
  //   // localStorage.setItem('userToken', token);
  //   this.token = token;
  // }
  //
  // private getToken(): string {
  //   if (!this.token) {
  //     console.log(this.cookieService.get('token'));
  //     this.token = localStorage.getItem('usertoken');
  //   }
  //   return this.token;
  // }

  public getUserDetails(): Observable<any> {
    return this.http.get(environment.serverRoutes + 'loggedIn');
  }

  public getUser(id): Observable<any> {
    return this.http.get(environment.serverRoutes + `getUser/${id}`);
  }

  public isLoggedIn(): Observable<any> {
    return this.http.get(environment.serverRoutes + 'loginCheck');
  }

  public refresh(refreshToken): Observable<TokenResponse> {
    console.log(refreshToken);
    return this.http.post<TokenResponse>(environment.serverRoutes + 'refreshToken', refreshToken);
  }

  public navItems(): boolean {
    return this.cookieService.check('token');
    // return localStorage.getItem('value') === 'true';
  }

  public register(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(environment.serverRoutes + 'register', user);
  }

  public updateUser(user: UserDetails, id): Observable<UserDetails> {
    return this.http.put<UserDetails>(environment.serverRoutes + `update/${id}`, user);
  }

  public login(user: UserInterface): Observable<any> {
    const base = this.http.post(`${environment.serverRoutes}login`, user);
    return base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.cookieService.set('token', data.token);
          // this.saveToken(data.token);
          this.cookieService.set('refreshToken', data.refreshToken);
        }
      })
    );
  }

  public profile(id): Observable<any> {
    return this.http.get(`${environment.serverRoutes}getuser/${id}`);
  }

  public logout(): void {
    this.cookieService.delete('refreshToken');
    this.cookieService.delete('token');
    this.router.navigateByUrl('/login');
  }

}
