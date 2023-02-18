import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  providers: [UserService],
})
export class TaskPageComponent implements OnInit {
  tasks: Array<Object> = [];

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('userId')) {
      this.router.navigate(['']);
    }
    this.refreshTasks();
  }

  onLogout() {
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }

  refreshTasks() {
    this.userService.getTasks().subscribe((res: any) => {
      this.tasks = res.tasks;
    });
  }
  getActiveTasks(): any[] {
    return this.tasks.filter((task: any) => !task.completed);
  }
  getCompletedTasks(): any[] {
    return this.tasks.filter((task: any) => task.completed);
  }
}
