import { IGetTodosRepository } from '../../controllers/get-todos/protocols';
import { Todo } from '../../models/todo';

export class MongoGetTodosRepository implements IGetTodosRepository {
  async getTodos(): Promise<Todo[]> {
    return [{ content: 'Lavar roupas', isDone: false }];
  }
}
