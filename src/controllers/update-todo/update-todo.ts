import { Todo } from '../../models/todo';
import { badRequest, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IUpdateTodoRepository, UpdateTodoParams } from './protocols';

export class UpdateTodoController implements IController {
  constructor(private readonly updateTodoRepository: IUpdateTodoRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateTodoParams>
  ): Promise<HttpResponse<Todo | string>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest.body;

      if (!body) {
        return badRequest('Faltando algum campo');
      }

      if (!id) {
        return badRequest('É necessário passar um id como parametro');
      }

      const allowedFieldsToUpdate: (keyof UpdateTodoParams)[] = ['content'];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateTodoParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest(
          'Algum campo recebido como parametro, não é permitido'
        );
      }

      const todo = await this.updateTodoRepository.updateTodo(id, body);

      return ok<Todo>(todo);
    } catch (error) {
      return serverError();
    }
  }
}
