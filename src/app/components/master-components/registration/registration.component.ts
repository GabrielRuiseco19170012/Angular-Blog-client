import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../../interfaces/UserInterface';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {enterLeave} from '../../../animations/animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    enterLeave
  ]
})
export class RegistrationComponent implements OnInit {

  user: UserInterface;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.user = this.form.value;
    this.auth.register(this.user).subscribe(
      () => {
        this.router.navigateByUrl('/login');
      },
      error => {
        console.error(error);
      }
    );
  }

  // Register(): void {
  //   this.auth.register(this.user).subscribe(
  //     () => {
  //       this.router.navigateByUrl('/login');
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }
}
