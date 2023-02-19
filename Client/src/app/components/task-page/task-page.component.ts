import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
import { ITask } from 'src/app/types/interfaces';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  providers: [UserService],
})
export class TaskPageComponent implements OnInit {
  tasks: Array<Object> = [];
  clicked: boolean = false;
  currentTask: ITask = {
    _id: '',
    title: '',
    completed: false,
  };

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
  onAddTask(title: HTMLInputElement) {
    if (!title.value) {
      return;
    }
    this.userService.addTask(title.value).subscribe((res: any) => {
      title.value = '';
      this.refreshTasks();
    });
  }
  onRemoveTask(taskId: String) {
    this.userService.removeTask(taskId).subscribe((res: any) => {
      this.refreshTasks();
    });
  }
  onCompleteTask(taskId: String) {
    this.userService.completeTask(taskId).subscribe((res: any) => {
      this.refreshTasks();
    });
  }
  onEditTask(taskId: String, title: String) {
    if (!title) {
      return;
    }
    this.userService.editTask(taskId, title).subscribe((res: any) => {
      this.refreshTasks();
    });
  }
}
