import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../types/interfaces';
import { ITask } from '../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedTask: ITask;
  tasks: ITask[];
  currentUser: IUser;
  constructor(private http: HttpClient) {}

  loginUser(user: IUser) {
    return this.http.post('http://localhost:3000/login', {
      username: user.username,
      password: user.password,
    });
  }
  registerUser(user: IUser) {
    return this.http.post('http://localhost:3000/register', {
      username: user.username,
      password: user.password,
    });
  }
  getTasks() {
    return this.http.get(
      `http://localhost:3000/user/${localStorage.getItem('userId')}`
    );
  }
  addTask(title: String) {
    return this.http.post(
      `http://localhost:3000/user/${localStorage.getItem('userId')}/AddTask`,
      {
        title: title,
      }
    );
  }
  removeTask(taskId: String) {
    return this.http.put(
      `http://localhost:3000/user/${localStorage.getItem('userId')}/RemoveTask`,
      {
        objectId: taskId,
      }
    );
  }
  completeTask(taskId: String) {
    return this.http.put(
      `http://localhost:3000/user/${localStorage.getItem(
        'userId'
      )}/CompleteTask`,
      {
        objectId: taskId,
      }
    );
  }
  editTask(taskId: String, title: String) {
    return this.http.put(
      `http://localhost:3000/user/${localStorage.getItem('userId')}/UpdateTask`,
      {
        objectId: taskId,
        title: title,
      }
    );
  }
}
