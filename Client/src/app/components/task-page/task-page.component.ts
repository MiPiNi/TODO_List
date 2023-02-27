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
  tasks: ITask[]; // array of tasks
  isEditing: boolean = false; //is user currently editing a task
  currentUserName: string; // current user's name
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    // on init, check if user is logged in, if not, redirect to login page
    if (localStorage.getItem('userId') || localStorage.getItem('username')) {
      this.refreshTasks();
      this.currentUserName = localStorage.getItem('username') as string; // get current user's name
    } else this.router.navigate(['']);
  }

  onLogout() {
    // logout user, clear local storage and redirect to login page
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }

  refreshTasks() {
    // get all tasks from server and update tasks array
    this.userService.getTasks().subscribe((res: ITask[]) => {
      this.tasks = res;
    });
  }
  getActiveTasks(): ITask[] {
    // filter tasks array to get active tasks
    if (this.tasks) return this.tasks.filter((task: ITask) => !task.completed);
    return [];
  }
  getCompletedTasks(): ITask[] {
    // filter tasks array to get completed tasks
    if (this.tasks) return this.tasks.filter((task: ITask) => task.completed);
    return [];
  }
  onAddTask(title: HTMLInputElement) {
    // add task to server using title input
    if (!title.value) {
      // if title is empty, do nothing
      return;
    }
    this.userService.addTask(title.value).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success') return console.error(res); // if server returns error, log it
      title.value = ''; // clear title input
      this.refreshTasks();
    });
  }
  onRemoveTask(taskId: String) {
    // remove task from server using task id
    this.userService.removeTask(taskId).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success') return console.error(res); // if server returns error, log it
      this.refreshTasks();
    });
  }
  onCompleteTask(taskId: String) {
    // change task 'completed' value on server using task id
    this.userService.completeTask(taskId).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success')
        return console.error(res); // if server returns error, log it
      else this.refreshTasks();
    });
  }
  onEditTask(taskId: String, title: String) {
    // edit task title on server using task id and title input
    if (!title) {
      // if title is empty, do nothing
      return;
    }
    this.userService.editTask(taskId, title).subscribe((res: ITaskResponse) => {
      if (res.message != 'Success')
        return console.error(res); // if server returns error, log it
      else this.refreshTasks();
    });
  }
}
