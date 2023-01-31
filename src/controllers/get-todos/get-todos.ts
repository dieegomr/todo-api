import { Todo } from '../../models/todo';
import { ok, serverError } from '../helpers';
import { HttpResponse, IController } from '../protocols';
import { IGetTodosRepository } from './protocols';

export class GetTodosController implements IController {
  constructor(private readonly getTodosRepository: IGetTodosRepository) {}
  async handle(): Promise<HttpResponse<Todo[] | string>> {
    try {
      const todos = await this.getTodosRepository.getTodos();

      return ok<Todo[]>(todos);
    } catch (error) {
      return serverError();
    }
  }
}
