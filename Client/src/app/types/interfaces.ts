export interface IUser {
  _id: string;
  username: string;
  password: string;
  tasks: ITask[];
}
export interface ITask {
  _id: string;
  title: string;
  completed: boolean;
}
