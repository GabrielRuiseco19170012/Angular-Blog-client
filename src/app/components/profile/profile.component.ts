import { UserInterface } from './../../interfaces/UserInterface';

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import { ProfileInterface } from './../../interfaces/profile-interface';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:string
  profile:ProfileInterface = {
    username:"",
    first_name:"",
    last_name:"",
    email:""
  }
  formUsername = new FormControl('')
  formUser = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl('')
  })
  
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.getProfile()
  }

  public getProfile() :void{
    this.auth.getUserId().subscribe(
      (res:string) => {
        this.id= res
        this.auth.profile(this.id).subscribe(
          (res:ProfileInterface) => {
            this.profile = res
            console.log(this.profile)
          },
          error => {
            console.error(error);
          }
        )
      },
      error => {
        console.error(error);
      }
    )
  }

  updateUsername(){
    this.auth.getUserId().subscribe(
      (res:string) => {
        this.id= res
        this.profile.username = this.formUsername.value
        console.log(this.profile)
        this.auth.updateUser(this.profile).subscribe((res:UserInterface)=>{
          console.log(res)
          this.getProfile()
        },
        error =>{
          console.error(error)
        })
      },
      error => {
        console.error(error)
      }
    )

  }



  /*
  public getId() :void {
    this.auth.getUserId().subscribe(
      (res:string) => {
        this.id= res
      },
      error => {
        console.error(error);
      }
    )
  }

  public getProfile() :void{
    this.getId()
    this.auth.profile(this.id).subscribe(
      (res:Observable<any>) => {
        this.profile = res
        console.log(this.profile)
      },
      error => {
        console.error(error);
      }
    )
  }
  */

}
