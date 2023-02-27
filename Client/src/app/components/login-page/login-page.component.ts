import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
import { IUser, IUserResponse } from '../../types/interfaces';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [UserService],
})
export class LoginPageComponent implements OnInit {
  // this is needed for MaterialUI to work (it needs to use two-way binding)
  currentUser: IUser = {
    username: '',
    password: '',
  };
  isError: boolean = false;
  errorMessage: string = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // if user is already logged in, redirect to tasks page
    if (localStorage.getItem('userId')) {
      this.router.navigate(['tasks']);
    }
  }
  onRegister(form: NgForm) {
    // register user, then login
    if (!form) {
      // if form is empty, return
      return;
    }
    this.userService
      .registerUser(form.value)
      .subscribe((res: IUserResponse) => {
        if (res.message) {
          // if there is an error, set error message
          this.isError = true;
          if (res.message == 'Username already exists') {
            this.errorMessage = 'Username already exists';
            return;
          }
          if (res.message == 'Username or password cannot be empty') {
            this.errorMessage = 'Username or password cannot be empty';
            return;
          }
          this.errorMessage = 'Something went wrong'; // this should never happen
          return;
        } else if (res._id) {
          this.onLogin(form);
        }
      });
  }
  onLogin(form: NgForm) {
    // login user
    if (!form) {
      return;
    }
    this.userService.loginUser(form.value).subscribe((res: IUserResponse) => {
      if (res.message) {
        // if there is an error, set error message
        this.isError = true;
        if (res.message == 'User not found') {
          this.errorMessage = 'User not found';
          return;
        }
        this.errorMessage = 'Something went wrong'; // this should never happen
        return;
      } else if (res._id && res.username) {
        // if user is logged in, save user id and username to localStorage and redirect to tasks page
        localStorage.setItem('userId', res._id);
        localStorage.setItem('username', res.username);
        this.router.navigate(['tasks']);
      }
    });
  }
}
