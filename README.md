# Todos API - Clean Architecture

A simple and modular **Task Management API** built with **Node.js**, following **Clean Architecture** principles. It supports **JWT authentication**, uses **Prisma ORM** with **PostgreSQL**, and includes input validation with **Zod**.

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
- DELETE `/tasks/:id` - Delete a task

You can filter by title using a query param:
`GET /tasks?title=reading`

## Testing

```bash
# Run unit tests
npm test
```