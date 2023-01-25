import { IGetTodosController, IGetTodosRepository } from './protocols';

export class GetTodosController implements IGetTodosController {
  constructor(private readonly getTodosRepository: IGetTodosRepository) {}
  async handle() {
    try {
      const todos = await this.getTodosRepository.getTodos();

      return {
        statusCode: 200,
        body: todos,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong',
      };
    }
  }
}
