import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
import { ITask, ITaskResponse } from 'src/app/types/interfaces';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  providers: [UserService],
})
export class TaskPageComponent implements OnInit {
  tasks: ITask[];
  clicked: boolean = false;
  currentUserName: string;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('userId') || localStorage.getItem('username')) {
      this.refreshTasks();
      this.currentUserName = localStorage.getItem('username') as string;
    } else this.router.navigate(['']);
  }

  onLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }

  refreshTasks() {
    console.log('refreshing tasks');
    this.userService.getTasks().subscribe((res: ITask[]) => {
      this.tasks = res;
    });
  }
  getActiveTasks(): ITask[] {
    if (this.tasks) return this.tasks.filter((task: ITask) => !task.completed);
    return [];
  }
  getCompletedTasks(): ITask[] {
    if (this.tasks) return this.tasks.filter((task: ITask) => task.completed);
    return [];
  }
  onAddTask(title: HTMLInputElement) {
    if (!title.value) {
      return;
    }
    this.userService.addTask(title.value).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success') return console.error(res);
      title.value = '';
      this.refreshTasks();
    });
  }
  onRemoveTask(taskId: String) {
    this.userService.removeTask(taskId).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success') return console.error(res);
      this.refreshTasks();
    });
  }
  onCompleteTask(taskId: String) {
    this.userService.completeTask(taskId).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success') return console.error(res);
      else this.refreshTasks();
    });
  }
  onEditTask(taskId: String, title: String) {
    if (!title) {
      return;
    }
    this.userService.editTask(taskId, title).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success') return console.error(res);
      else this.refreshTasks();
    });
  }
}
