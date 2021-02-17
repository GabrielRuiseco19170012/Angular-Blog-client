import {UserInterface} from '../../interfaces/UserInterface';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl} from '@angular/forms';
import {UserDetails} from '../../interfaces/user-details';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: UserDetails = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  };

  formUsername = new FormControl('');
  formFirstName = new FormControl('');
  formLastName = new FormControl('');
  formEmail = new FormControl('');

  id: string;

  constructor(private auth: AuthService) {
  }


  ngOnInit(): void {
    this.getUserDetails();
  }


  getUserDetails(): void {
    this.auth.getUserDetails().subscribe(data => {
      this.id = data.id;
      this.auth.profile(data.id).subscribe(
        user => {
          this.details = user;
        }, error => {
          console.error(error);
        }
      );
    });
  }

  updateUsername(): void {
    this.details.username = this.formUsername.value;
    this.auth.updateUser(this.details, this.id).subscribe((res1: UserInterface) => {
        // console.log(res1);
      },
      error => {
        console.error(error);
      }
    );
    this.getUserDetails();
  }

  updateFirstName(): void {
    this.details.first_name = this.formFirstName.value;
    this.auth.updateUser(this.details, this.id).subscribe((res2: UserInterface) => {
        // console.log(res2);
      },
      error => {
        console.error(error);
      }
    );
    this.getUserDetails();
  }

  updateLastName(): void {
    this.details.last_name = this.formLastName.value;
    this.auth.updateUser(this.details, this.id).subscribe((res3: UserInterface) => {
        // console.log(res3);
      },
      error => {
        console.error(error);
      }
    );
    this.getUserDetails();
  }

  updateEmail(): void {
    this.details.email = this.formEmail.value;
    this.auth.updateUser(this.details, this.id).subscribe((res4: UserInterface) => {
        // console.log(res4);
      },
      error => {
        console.error(error);
      }
    );
    this.getUserDetails();
  }

}
