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
      const requiredFields = ['content', 'isDone'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateTodoParams]?.length) {
          return badRequest(`Preencha o campo ${field}`);
        }
      }

      const todo = await this.createTodoRepository.createTodo(
        httpRequest.body!
      );

      return created<Todo>(todo);
    } catch (error) {
      return serverError();
    }
  }
}
