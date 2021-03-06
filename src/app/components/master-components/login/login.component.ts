import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../../interfaces/UserInterface';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {enterLeave} from '../../../animations/animations';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    enterLeave
  ]
})
export class LoginComponent implements OnInit {
  message: string = null;
  user: UserInterface;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.user = this.form.value;
    this.auth.login(this.user).subscribe(
      data => {
        if (this.cookieService.check('token')) {
          this.router.navigateByUrl('/profile');
        } else {
          return {message: 'user not found'};
        }
      },
      error => {
        if (error.status === 401) {
          this.message = 'Usuario no valido';
        }
      }
    );
  }

}
