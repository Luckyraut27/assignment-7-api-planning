# To-Do List App – API Planning

## Project Overview
This project focuses on planning RESTful APIs for a To-Do List application. The APIs will allow users to create, retrieve, update, and delete tasks.

## Technology Stack
- React.js
- Node.js
- Express.js

## API Base URL
`http://localhost:5000/api/tasks`

## API Endpoints

| Method | Endpoint | Description |

| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

## CRUD Operations
- Create: POST
- Read: GET
- Update: PUT / PATCH
- Delete: DELETE

## Unique Task ID
UUID is recommended to generate a unique ID automatically whenever a new task is created.

## API Workflow
1. React sends a request to the backend.
2. Express receives and processes the request.
3. The backend validates the data.
4. The backend performs the requested operation.
5. The backend returns a JSON response.
6. React updates the interface.

## Setup Instructions

This repository contains API planning documentation. The actual backend implementation can be completed in a later stage.

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in VS Code.
4. If a `package.json` is present, install dependencies using:

   `npm install`

5. If a backend server implementation is available, start it using the appropriate command defined in `package.json`, or:

   `node index.js`

6. The planned API base URL is:

   `http://localhost:5000/api/tasks`

## Project Status
API planning and documentation.