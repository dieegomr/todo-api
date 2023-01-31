import { Todo } from '../../models/todo';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IDeleteTodoController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Todo>>;
}

export interface IDeleteTodoRepository {
  deleteTodo(id: string): Promise<Todo>;
}
