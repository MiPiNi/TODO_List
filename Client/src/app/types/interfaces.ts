export interface IUser {
  _id?: string;
  username?: string;
  password?: string;
  tasks?: ITask[];
}
export interface IUserResponse {
  _id?: string;
  username?: string;
  tasks?: ITask[];
  message?: string;
}
export interface ITask {
  _id: string;
  title: string;
  completed: boolean;
}
export interface ITaskResponse {
  _id?: string;
  title?: string;
  completed?: boolean;
  message?: string;
}
