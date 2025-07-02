# Todos API - Clean Architecture

A simple and modular **Task Management API** built with **Node.js**, following **Clean Architecture** principles. It supports **JWT authentication**, uses **Prisma ORM** with **PostgreSQL**, and includes input validation with **Zod**.

---

## Technologies

<p align="left">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000">
    <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB">
    <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff">
    <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white">
    <img src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff">
</p>

---

## Requirements

- Node.js 18+

- Docker and Docker Compose

- PostgreSQL (if not using Docker)

- Prisma CLI

---

## Running with Docker

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Install dependencies
npm install

# Create and apply migrations
npx prisma migrate dev

# Run the server
npm run dev
```

---

## Environment variables

This project uses environment variables to configure sensitive or environment-specific settings.
Create a `.env` file in the root directory by copying the provided `.env.example` file:

```bash
cp .env.example .env
```

Then, update the values in `.env` according to your local setup:
- `DATABASE_URL`: Connection string for the PostgreSQL database
- `JWT_SECRET`: Secret key used to sign and verify JWT tokens
- `PORT`: Port on which the server will run (default is 3000)

Environment variables declared in the `.env` file are automatically made available to Prisma.

---

## API Endpoints

### Authentication

Flow:

- POST `/signup` – Register a new user

- POST `/login` – Authenticate and receive a token

Send the token to access protected routes:

`Authorization: Bearer <your_token>`

### Tasks (JWT protected)

- GET `/tasks` - List all tasks for a user
- GET `/tasks/:id` - Get a specific task by ID
- POST `/tasks` - Create a new task
- PATCH `/tasks/:id` - Partially update a task (example: send `completed: true`)
- DELETE `/tasks/:id` - Delete a task

You can filter by title using a query param:
`GET /tasks?title=reading`

---

## Testing

```bash
# Run unit tests
npm test
```