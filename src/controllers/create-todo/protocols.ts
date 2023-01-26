import { Todo } from '../../models/todo';
import { HttpRequest, HttpResponse } from '../protocols';

export interface ICreateTodoController {
  handle(
    httpRequest: HttpRequest<CreateTodoParams>
  ): Promise<HttpResponse<Todo>>;
}

export interface CreateTodoParams {
  content: string;
}

export interface ICreateTodoRepository {
  createTodo(params: CreateTodoParams): Promise<Todo>;
}
