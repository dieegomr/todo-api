import {
  CreateTodoParams,
  ICreateTodoRepository,
} from '../../controllers/create-todo/protocols';

import { MongoClient } from '../../database/mongo';

import { Todo } from '../../models/todo';
import { MongoUser } from '../mongo-protocols';

export class MongoCreateTodoRepository implements ICreateTodoRepository {
  async createTodo(params: CreateTodoParams): Promise<Todo> {
    const { insertedId } = await MongoClient.db
      .collection('todos')
      .insertOne(params);

    const todo = await MongoClient.db
      .collection<MongoUser>('todos')
      .findOne({ _id: insertedId });

    if (!todo) {
      throw new Error('Tarefa não foi criada');
    }

    const { _id, ...rest } = todo;

    return { id: _id.toHexString(), ...rest };
  }
}
