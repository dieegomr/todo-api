import { Todo } from '../../models/todo';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  CreateTodoParams,
  ICreateTodoController,
  ICreateTodoRepository,
} from './protocols';

export class CreateTodoController implements ICreateTodoController {
  constructor(private readonly createTodoRepository: ICreateTodoRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateTodoParams>
  ): Promise<HttpResponse<Todo>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: 'Por favor preencha o body da requisição',
        };
      }

      const requiredFields = ['content'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field as keyof CreateTodoParams].length) {
          return {
            statusCode: 400,
            body: `Preencha o campo ${field}`,
          };
        }
      }

      const todo = await this.createTodoRepository.createTodo(httpRequest.body);

      return { statusCode: 201, body: todo };
    } catch (error) {
      return { statusCode: 500, body: 'Algo deu errado' };
    }
  }
}
