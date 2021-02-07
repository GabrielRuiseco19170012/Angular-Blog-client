import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  public res: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    await this.auth.isLoggedIn().toPromise().then(result => {
      console.log(result);
      this.res = result;
    });
    if (!this.res) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
