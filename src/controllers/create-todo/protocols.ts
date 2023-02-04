import { Todo } from '../../models/todo';

export interface CreateTodoParams {
  content: string;
  isDone: boolean;
}

export interface ICreateTodoRepository {
  createTodo(params: CreateTodoParams): Promise<Todo>;
}
