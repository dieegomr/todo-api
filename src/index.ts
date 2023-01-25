import express from 'express';
import { config } from 'dotenv';
import { GetTodosController } from './controllers/get-todos/get-todos';
import { MongoGetTodosRepository } from './repositories/get-todos/mongo-get-todos';
import { MongoClient } from './database/mongo';

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get('/todos', async (req, res) => {
    const mongoGetTodosRepository = new MongoGetTodosRepository();
    const getTodosController = new GetTodosController(mongoGetTodosRepository);

    const { body, statusCode } = await getTodosController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.port || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
