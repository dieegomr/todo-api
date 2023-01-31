import { Todo } from '../../models/todo';
import { badRequest, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IDeleteTodoRepository } from './protocols';

export class DeleteTodoController implements IController {
  constructor(private readonly deleteTodoRepository: IDeleteTodoRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Todo | string>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return badRequest('Obrigatório id do usuário');
      }

      const todo = await this.deleteTodoRepository.deleteTodo(id);

      return ok<Todo>(todo);
    } catch (error) {
      return serverError();
    }
  }
}
