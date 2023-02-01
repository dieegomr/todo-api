# Todo API

A todo API possibilita ler uma lista de tarefas ou criar, editar, deletar uma tarefa.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MongoDB

## Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern

## Entidades

<pre>
Todo {
    id: string,
    content: string,
    isDone: boolean
}</pre>

## Rotas

- GET /todos - retorna as tarefas salvas no banco
- POST /todos - cria uma tarefa
  body precisa ter os campos: "content", "isDone"
- PATCH /todos/:id - atualiza uma tarefa
- DELETE /todos/:id - deleta uma tarefa

## Arquitetura

![Arquitetura](https://us-east-1.tixte.net/uploads/dieegomr.tixte.co/Arquitetura-Todo-API.png)
