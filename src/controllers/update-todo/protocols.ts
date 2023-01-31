import { Todo } from '../../models/todo';
import { HttpRequest, HttpResponse } from '../protocols';

export interface UpdateTodoParams {
  content: string;
}

export interface IUpdateTodoController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Todo>>;
}

export interface IUpdateTodoRepository {
  updateTodo(id: string, params: UpdateTodoParams): Promise<Todo>;
}
