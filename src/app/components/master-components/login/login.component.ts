import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../../interfaces/UserInterface';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserInterface;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.user = this.form.value;
    this.auth.login(this.user).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      error => {
        console.error(error);
      }
    );
  }

}
