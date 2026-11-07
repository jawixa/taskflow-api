# TASKFLOW - Task and Project Management System API

🇹🇷 [Türkçe sürüm](README.md)

A REST API built with Node.js and Express.js that lets teams create tasks, assign them to employees, and track their status and priority. It was prepared as the final project of the Node.js Backend Programming course.

## Features

- Create, list, view, update and delete tasks (CRUD)
- Assign tasks to employees (`assignee`) and manage status (`status`) and priority (`priority`)
- Logger middleware that records every request (console + `logs/requests.log`)
- Data is stored in a JSON file, no database setup required
- Proper HTTP status codes (200, 201, 400, 404, 500)

## Requirements

- [Node.js](https://nodejs.org/) 18 or higher (includes npm)
- [Postman](https://www.postman.com/downloads/) (for testing)
- Git

## Installation

```bash
# 1. Download the project
git clone https://github.com/jawixa>/backend_proje.git
cd taskflow-api

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The server runs at `http://localhost:3000` by default. To use a different port:

```bash
PORT=4000 npm start          # macOS / Linux
$env:PORT=4000; npm start    # Windows PowerShell
```

During development, `npm run dev` restarts the server automatically when files change.

If the server is running, `http://localhost:3000` returns:

```json
{ "name": "TASKFLOW API", "message": "Görev ve Proje Yönetim Sistemi API çalışıyor", "version": "1.0.0" }
```

## API Endpoints

| Method | Endpoint | Description | Success code |
|---|---|---|---|
| POST | `/tasks` | Creates a new task | 201 |
| GET | `/tasks` | Lists all tasks | 200 |
| GET | `/tasks/:id` | Returns the details of one task | 200 |
| PUT | `/tasks/:id` | Updates a task (only the sent fields change) | 200 |
| DELETE | `/tasks/:id` | Deletes a task | 200 |

### Task model

| Field | Type | Description |
|---|---|---|
| `id` | number | Auto-incremented unique number |
| `title` | string | Task title (**required**) |
| `description` | string | Description (default: empty) |
| `status` | string | `pending`, `in-progress`, `completed` (default: `pending`) |
| `priority` | string | `low`, `medium`, `high` (default: `medium`) |
| `assignee` | string | Person the task is assigned to (default: `null`) |
| `createdAt` | ISO date | Creation time |
| `updatedAt` | ISO date | Last update time |

### Example request and response

`POST /tasks`

```json
{
  "title": "Write the login endpoint",
  "description": "Prepare the endpoint for the user login flow",
  "priority": "high",
  "assignee": "musa"
}
```

Response (`201 Created`):

```json
{
  "id": 1,
  "title": "Write the login endpoint",
  "description": "Prepare the endpoint for the user login flow",
  "status": "pending",
  "priority": "high",
  "assignee": "musa",
  "createdAt": "2026-11-07T18:03:35.052Z",
  "updatedAt": "2026-11-07T18:03:35.052Z"
}
```

### Error responses

| Code | When? | Example |
|---|---|---|
| 400 | Missing `title`, invalid `status`/`priority`, invalid id or malformed JSON | `{ "message": "title alanı zorunludur" }` |
| 404 | Task or endpoint not found | `{ "message": "Görev bulunamadı" }` |
| 500 | Unexpected server error | `{ "message": "Sunucu hatası" }` |

Note: API response messages are in Turkish.

## Logger

For every request, the timestamp, HTTP method, endpoint, status code and duration are recorded. Entries are written to the console and to `logs/requests.log`:

```
[2026-11-07T18:03:35.058Z] POST /tasks - 201 (12ms)
[2026-11-07T18:03:35.083Z] GET /tasks - 200 (2ms)
```

## Project Structure

```
taskflow-api/
├── src/
│   ├── app.js                    # Application entry point
│   ├── routes/taskRoutes.js      # Task routes
│   ├── controllers/taskController.js  # CRUD business logic
│   ├── middleware/logger.js      # Logger middleware
│   └── data/
│       ├── taskStore.js          # JSON file read/write
│       └── tasks.json            # Task data
├── docs/
│   ├── PROJE_TANITIM.md          # Project introduction document (Turkish)
│   ├── POSTMAN_TEST_REHBERI.md   # Test steps (Turkish)
│   ├── TASKFLOW.postman_collection.json  # Postman collection
│   └── screenshots/              # Postman screenshots
├── package.json
└── README.md / README.en.md
```

## Testing with Postman

1. In Postman, use **Import** to load `docs/TASKFLOW.postman_collection.json`.
2. Make sure the server is running (`npm start`).
3. Run the requests in order. See [docs/POSTMAN_TEST_REHBERI.md](docs/POSTMAN_TEST_REHBERI.md) for details (in Turkish).

## Documents

- [Project Introduction Document](docs/PROJE_TANITIM.md) (Turkish)
- [Postman Test Guide](docs/POSTMAN_TEST_REHBERI.md) (Turkish)
