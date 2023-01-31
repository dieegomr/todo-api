import { Todo } from '../../models/todo';
import { HttpResponse } from '../protocols';

export interface IGetTodosRepository {
  getTodos(): Promise<Todo[]>;
}
