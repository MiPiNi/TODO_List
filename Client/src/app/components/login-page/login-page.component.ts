import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [UserService],
})
export class LoginPageComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.currentUser = {
      _id: '',
      username: '',
      password: '',
      tasks: [],
    };
  }
  onRegister(form: NgForm) {
    if (!form) {
      return;
    }
    this.userService.registerUser(form.value).subscribe((res: any) => {
      if (res.message) {
        if (res.message == 'Username already exists')
          return console.error('User already exists');
        if (res.message == 'Username or password cannot be empty')
          return console.error('Username or password cannot be empty');
      }

      localStorage.setItem('userId', res._id);
      this.router.navigate(['tasks']);
    });
  }
  onLogin(form: NgForm) {
    if (!form) {
      return;
    }
    this.userService.loginUser(form.value).subscribe((res: any) => {
      if (res === null) return console.error('User not found');
      localStorage.setItem('userId', res._id);
      this.router.navigate(['tasks']);
    });
  }
}
