import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  public res: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    await this.auth.isLoggedIn().toPromise().then(result => {
      // console.log(result);
      this.res = result;
      // console.log(this.res);
    });
    if (!this.res) {
      await this.router.navigateByUrl('/');
      window.alert('session expired');
      this.auth.logout();
      return false;
    } else {
      return true;
    }
  }
}
