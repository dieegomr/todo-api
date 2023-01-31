import { Todo } from '../../models/todo';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  IUpdateTodoController,
  IUpdateTodoRepository,
  UpdateTodoParams,
} from './protocols';

export class UpdateTodoController implements IUpdateTodoController {
  constructor(private readonly updateTodoRepository: IUpdateTodoRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Todo>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'É necessário passar um id como parametro',
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateTodoParams)[] = ['content'];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateTodoParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: 'Algum campo recebido como parametro, não é permitido',
        };
      }

      const todo = await this.updateTodoRepository.updateTodo(id, body);

      return {
        statusCode: 200,
        body: todo,
      };
    } catch (error) {
      return { statusCode: 500, body: 'Algo deu errado' };
    }
  }
}
