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
    content: string
}</pre>

## Rotas

- GET /todos - retorna as tarefas salvas no banco
- POST /todos - cria uma tarefa
- PATCH /todos/:id - atualiza uma tarefa
- DELETE /todos/:id - deleta uma tarefa

## Arquitetura

Futuramente uma imagem da arquitetura
