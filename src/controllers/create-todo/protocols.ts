import { Todo } from '../../models/todo';

export interface CreateTodoParams {
  content: string;
}

export interface ICreateTodoRepository {
  createTodo(params: CreateTodoParams): Promise<Todo>;
}
