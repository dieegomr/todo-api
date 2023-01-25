import { Todo } from '../../models/todo';
import { HttpResponse } from '../protocols';

export interface IGetTodosController {
  handle(): Promise<HttpResponse<Todo[]>>;
}

export interface IGetTodosRepository {
  getTodos(): Promise<Todo[]>;
}
