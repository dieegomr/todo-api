import { Todo } from '../../models/todo';

export interface IDeleteTodoRepository {
  deleteTodo(id: string): Promise<Todo>;
}
