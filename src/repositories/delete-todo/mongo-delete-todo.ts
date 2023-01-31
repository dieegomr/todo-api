import { ObjectId } from 'mongodb';
import { IDeleteTodoRepository } from '../../controllers/delete-todo/protocols';
import { MongoClient } from '../../database/mongo';
import { Todo } from '../../models/todo';

export class MongoDeleteTodoRepository implements IDeleteTodoRepository {
  async deleteTodo(id: string): Promise<Todo> {
    const todo = await MongoClient.db
      .collection<Omit<Todo, 'id'>>('todos')
      .findOne({ _id: new ObjectId(id) });

    if (!todo) {
      throw new Error('Tarefa não encontrada');
    }

    const { deletedCount } = await MongoClient.db
      .collection('todos')
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error('Usuário não foi deletado');
    }

    const { _id, ...rest } = todo;

    return { id: _id.toHexString(), ...rest };
  }
}
