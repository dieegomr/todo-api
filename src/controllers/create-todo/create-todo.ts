import { Todo } from '../../models/todo';
import { badRequest, created, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { CreateTodoParams, ICreateTodoRepository } from './protocols';

export class CreateTodoController implements IController {
  constructor(private readonly createTodoRepository: ICreateTodoRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateTodoParams>
  ): Promise<HttpResponse<Todo | string>> {
    try {
      if (!httpRequest.body?.content || httpRequest.body?.content.length === 0)
        return badRequest('Preencha o campo content');

      if (typeof httpRequest.body.isDone !== 'boolean')
        return badRequest('Preencha o campo isDone');

      const todo = await this.createTodoRepository.createTodo(
        httpRequest.body!
      );

      return created<Todo>(todo);
    } catch (error) {
      return serverError();
    }
  }
}
