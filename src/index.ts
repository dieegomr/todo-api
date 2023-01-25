import express from 'express';
import { config } from 'dotenv';
import { GetTodosController } from './controllers/get-todos/get-todos';
import { MongoGetTodosRepository } from './repositories/get-todos/mongo-get-todos';

config();

const app = express();

const port = process.env.port || 8000;

app.get('/todos', async (req, res) => {
  const mongoGetTodosRepository = new MongoGetTodosRepository();
  const getTodosController = new GetTodosController(mongoGetTodosRepository);

  const { body, statusCode } = await getTodosController.handle();

  res.send(body).status(statusCode);
});

app.listen(port, () => console.log(`listening on port ${port}`));
