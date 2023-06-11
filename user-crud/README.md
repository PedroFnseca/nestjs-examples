# Crud Simples com Nestjs e Supabase

Este é um exemplo de um CRUD (Create, Read, Update, Delete) simples utilizando o framework NestJS e o Supabase como banco de dados. O CRUD será implementado para uma tabela chamada user_table com os seguintes campos: `id`, `created_at`, `updated_at`, `name`, `borned_at`, `email` e `password`.

## Requisitos

- NodeJS
- NestJS
- Supabase

## Instalação

- Clone o repositório
- Instale as dependências com `npm install`
- Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
SUPABASE_JWT_SECRET=
SUPABASE_KEY=
SUPABASE_URL=
```

- Execute o projeto com `npm run start:dev`

## Rotas

- `GET /users`: Retorna todos os usuários cadastrados
- `GET /users/:id`: Retorna um usuário específico
- `POST /users`: Cria um novo usuário
- `PUT /users/:id`: Atualiza um usuário específico
- `DELETE /users/:id`: Deleta um usuário específico

## Referências

[Supabase](https://supabase.io/)
<br>
[NestJS](https://nestjs.com/)
