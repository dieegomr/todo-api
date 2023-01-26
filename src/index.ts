import express from 'express';
import { config } from 'dotenv';
import { GetTodosController } from './controllers/get-todos/get-todos';
import { MongoGetTodosRepository } from './repositories/get-todos/mongo-get-todos';
import { MongoClient } from './database/mongo';
import { MongoCreateTodoRepository } from './repositories/create-todo/mongo-create-todo';
import { CreateTodoController } from './controllers/create-todo/create-todo';

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

  const port = process.env.port || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
