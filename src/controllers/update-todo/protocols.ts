import { Todo } from '../../models/todo';

export interface UpdateTodoParams {
  content: string;
}

export interface IUpdateTodoRepository {
  updateTodo(id: string, params: UpdateTodoParams): Promise<Todo>;
}
