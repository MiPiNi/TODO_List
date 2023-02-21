import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ITask,
  IUserResponse,
  IUser,
  ITaskResponse,
} from '../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loginUser(user: IUser) {
    return this.http.post('http://localhost:3000/login', {
      username: user.username,
      password: user.password,
    }) as Observable<IUserResponse>;
  }
  registerUser(user: IUser) {
    return this.http.post('http://localhost:3000/register', {
      username: user.username,
      password: user.password,
    }) as Observable<IUserResponse>;
  }
  getTasks() {
    return this.http.get(
      `http://localhost:3000/user/${localStorage.getItem('userId')}`
    ) as Observable<ITask[]>;
  }
  addTask(title: String) {
    return this.http.post(
      `http://localhost:3000/user/${localStorage.getItem('userId')}/AddTask`,
      {
        title: title,
      }
    ) as Observable<ITaskResponse>;
  }
  removeTask(taskId: String) {
    return this.http.put(
      `http://localhost:3000/user/${localStorage.getItem('userId')}/RemoveTask`,
      {
        objectId: taskId,
      }
    ) as Observable<ITaskResponse>;
  }
  completeTask(taskId: String) {
    return this.http.put(
      `http://localhost:3000/user/${localStorage.getItem(
        'userId'
      )}/CompleteTask`,
      {
        objectId: taskId,
      }
    ) as Observable<ITaskResponse>;
  }
  editTask(taskId: String, title: String) {
    return this.http.put(
      `http://localhost:3000/user/${localStorage.getItem('userId')}/UpdateTask`,
      {
        objectId: taskId,
        title: title,
      }
    ) as Observable<ITaskResponse>;
  }
}
