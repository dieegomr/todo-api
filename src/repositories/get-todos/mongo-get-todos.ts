import { IGetTodosRepository } from '../../controllers/get-todos/protocols';
import { MongoClient } from '../../database/mongo';
import { Todo } from '../../models/todo';

export class MongoGetTodosRepository implements IGetTodosRepository {
  async getTodos(): Promise<Todo[]> {
    const todos = await MongoClient.db
      .collection<Omit<Todo, 'id'>>('todos')
      .find()
      .toArray();

    return todos.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
