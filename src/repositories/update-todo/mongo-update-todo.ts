import { ObjectId } from 'mongodb';
import {
  IUpdateTodoRepository,
  UpdateTodoParams,
} from '../../controllers/update-todo/protocols';
import { MongoClient } from '../../database/mongo';
import { Todo } from '../../models/todo';
import { MongoUser } from '../mongo-protocols';

export class MongoUpdateTodoRepository implements IUpdateTodoRepository {
  async updateTodo(id: string, params: UpdateTodoParams): Promise<Todo> {
    await MongoClient.db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const todo = await MongoClient.db
      .collection<MongoUser>('todos')
      .findOne({ _id: new ObjectId(id) });

    if (!todo) {
      throw new Error('A tarefa não foi atualizada');
    }

    const { _id, ...rest } = todo;

    return { id: _id.toHexString(), ...rest };
  }
}
