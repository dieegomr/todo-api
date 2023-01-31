import { Todo } from '../models/todo';

export type MongoUser = Omit<Todo, 'id'>;
