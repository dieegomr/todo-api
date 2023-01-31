import express from 'express';
import { config } from 'dotenv';
import { GetTodosController } from './controllers/get-todos/get-todos';
import { MongoGetTodosRepository } from './repositories/get-todos/mongo-get-todos';
import { MongoClient } from './database/mongo';
import { MongoCreateTodoRepository } from './repositories/create-todo/mongo-create-todo';
import { CreateTodoController } from './controllers/create-todo/create-todo';
import { MongoUpdateTodoRepository } from './repositories/update-todo/mongo-update-todo';
import { UpdateTodoController } from './controllers/update-todo/update-todo';
import { MongoDeleteTodoRepository } from './repositories/delete-todo/mongo-delete-todo';
import { DeleteTodoController } from './controllers/delete-todo/delete-todo';
import { badRequest } from './controllers/helpers';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get('/todos', async (req, res) => {
    const mongoGetTodosRepository = new MongoGetTodosRepository();

    const getTodosController = new GetTodosController(mongoGetTodosRepository);

    const { body, statusCode } = await getTodosController.handle();

    res.status(statusCode).send(body);
  });

  app.post('/todos', async (req, res) => {
    const mongoCreateTodoRepository = new MongoCreateTodoRepository();

    const createTodoController = new CreateTodoController(
      mongoCreateTodoRepository
    );

    const { body, statusCode } = await createTodoController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch('/todos/:id', async (req, res) => {
    const mongoUpdateTodoRepository = new MongoUpdateTodoRepository();

    const updateTodoController = new UpdateTodoController(
      mongoUpdateTodoRepository
    );

    const { body, statusCode } = await updateTodoController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete('/todos/:id', async (req, res) => {
    const mongoDeleteTodoRepository = new MongoDeleteTodoRepository();

    const deleteTodoController = new DeleteTodoController(
      mongoDeleteTodoRepository
    );

    const { body, statusCode } = await deleteTodoController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.all('*', async (req, res) => {
    const { body, statusCode } = badRequest(
      `Não foi possível encontrar ${req.originalUrl} neste servidor`
    );

    res.status(statusCode).send(body);
  });

  const port = process.env.port || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
