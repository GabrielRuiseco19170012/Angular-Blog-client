import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenResponse} from '../../interfaces/TokenResponse';
import {map} from 'rxjs/operators';
import {UserInterface} from '../../interfaces/UserInterface';
import {UserDetails} from '../../interfaces/user-details';

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
    return this.http.get(environment.serverRoutes + 'loggedIn');
  }

  public isLoggedIn(): Observable<any> {
    return this.http.get(environment.serverRoutes + 'loginCheck');
  }

  public navItems(): boolean {
    return localStorage.getItem('value') === 'true';
  }

  public register(user: UserInterface): Observable<any> {
    return this.http.post(environment.serverRoutes + 'register', user);
  }

  public updateUser(user: UserDetails, id): Observable<any> {
    return this.http.put(environment.serverRoutes + `update/${id}`, user);
  }

  public login(user: UserInterface): Observable<any> {
    const base = this.http.post(`${environment.serverRoutes}login`, user);

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
    return this.http.get(`${environment.serverRoutes}getuser/${id}`);
  }

  public logout(): void {
    this.state = false;
    window.localStorage.removeItem('value');
    this.token = '';
    window.localStorage.removeItem('userToken');
    this.router.navigateByUrl('/');
  }

}
