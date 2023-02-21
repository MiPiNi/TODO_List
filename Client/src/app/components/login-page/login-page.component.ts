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
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.router.navigate(['tasks']);
    }
  }
  onRegister(form: NgForm) {
    if (!form) {
      return;
    }
    this.userService
      .registerUser(form.value)
      .subscribe((res: IUserResponse) => {
        if (res.message) {
          if (res.message == 'Username already exists')
            return console.error('User already exists');
          if (res.message == 'Username or password cannot be empty')
            return console.error('Username or password cannot be empty');
          return;
        } else if (res._id) {
          this.onLogin(form);
        }
      });
  }
  onLogin(form: NgForm) {
    if (!form) {
      return;
    }
    this.userService.loginUser(form.value).subscribe((res: IUserResponse) => {
      if (res.message === 'User not found')
        return console.error('User not found');
      else if (res._id && res.username) {
        localStorage.setItem('userId', res._id);
        localStorage.setItem('username', res.username);
        this.router.navigate(['tasks']);
      }
    });
  }
}
