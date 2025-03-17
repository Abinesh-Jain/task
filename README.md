# User Authentication & Task Management

## 📌 Overview
A simple authentication and task management using Node.js, Express, MongoDB, and JWT.

## 🚀 Authentication Endpoints

### 1️⃣ User Sign-Up
**POST** `/sign-up` – Registers a new user.

#### Request Example:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response:
✅ `201 Created` – User registered successfully.
❌ `400 Bad Request` – Email already exists or validation error.

### 2️⃣ User Login
**POST** `/login` – Authenticates an existing user.

#### Request Example:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response:
✅ `200 OK` – Login successful, tokens issued.
```json
{
  "accessToken": "your-jwt-access-token",
  "refreshToken": "your-jwt-refresh-token"
}
```
❌ `404 Not Found` – User does not exist.
❌ `401 Unauthorized` – Invalid password.

## 🔐 Authorization Middleware
To access protected routes, include the JWT token in the Authorization header:
```http
Authorization: Bearer your-jwt-access-token
```
If authentication fails:
❌ `401 Unauthorized` – Invalid or expired token.

## ✅ Task Management API

### 1️⃣ Get All Tasks
**GET** `/tasks` – Returns paginated tasks.

#### Request Example:
```http
GET /tasks
Authorization: Bearer your-jwt-access-token
```

#### Response Example:
```json
{
  "totalPages": 3,
  "currentPage": 1,
  "tasks": [
    {
      "_id": "task1",
      "name": "Design UI",
      "description": "Create wireframes",
      "status": "Pending",
      "userId": "user123"
    },
    {
      "_id": "task2",
      "name": "Develop Backend",
      "description": "Set up database",
      "status": "In Progress",
      "userId": "user123"
    }
  ]
}
```

### 2️⃣ Get a Single Task
**GET** `/tasks/:id` – Fetches a task by ID.

#### Request Example:
```http
GET /tasks/64f3c5a2b7d8a2a1d9f4e23b
Authorization: Bearer your-jwt-access-token
```

#### Response Example:
```json
{
  "_id": "64f3c5a2b7d8a2a1d9f4e23b",
  "name": "Fix Bugs",
  "description": "Resolve login issue",
  "status": "Pending",
  "userId": "user123"
}
```
❌ `404 Not Found` – Task does not exist.

### 3️⃣ Create a Task
**POST** `/tasks` – Adds a new task.

#### Request Example:
```json
{
  "name": "Write API Docs",
  "description": "Document all endpoints",
  "status": "Pending",
  "userId": "user123"
}
```

#### Response Example:
✅ `201 Created` – Task added successfully.
```json
{
  "_id": "65b4e6c78f5c1a001c8a2e3b",
  "name": "Write API Docs",
  "description": "Document all endpoints",
  "status": "Pending",
  "userId": "user123"
}
```

### 4️⃣ Update a Task
**PUT** `/tasks/:id` – Fully updates a task.

#### Request Example:
```json
{
  "name": "Write API Docs",
  "description": "Update all endpoint details",
  "status": "In Progress",
  "userId": "user123"
}
```

#### Response Example:
```json
{
  "_id": "65b4e6c78f5c1a001c8a2e3b",
  "name": "Write API Docs",
  "description": "Update all endpoint details",
  "status": "In Progress",
  "userId": "user123"
}
```
❌ `400 Bad Request` – Invalid data.

### 5️⃣ Partially Update a Task
**PATCH** `/tasks/:id` – Updates specific task fields.

#### Request Example:
```json
{
  "status": "Completed"
}
```

#### Response Example:
```json
{
  "_id": "65b4e6c78f5c1a001c8a2e3b",
  "name": "Write API Docs",
  "description": "Update all endpoint details",
  "status": "Completed",
  "userId": "user123"
}
```

### 6️⃣ Delete a Task
**DELETE** `/tasks/:id` – Removes a task by ID.

#### Request Example:
```http
DELETE /tasks/65b4e6c78f5c1a001c8a2e3b
Authorization: Bearer your-jwt-access-token
```

#### Response:
✅ `200 OK` – Task deleted successfully.
```json
{
  "message": "Deleted Task"
}
```
❌ `404 Not Found` – Task does not exist.

## 🔐 Security & Authorization
✅ JWT-based authentication required for all task routes.
✅ Middleware `authorize` protects endpoints.
✅ Pagination implemented for task listing.

## 🎨 Frontend Implementation (Angular)
The frontend for this API is built using Angular and consists of two main pages:

### 1️⃣ Authentication Page (`/auth`)
- Allows users to **Sign In** and **Sign Up**.
- Handles JWT authentication.
- Stores tokens securely.

### 2️⃣ Home Page (`/home`)
- Displays the **Task Management Dashboard**.
- Allows users to **Create, Read, Update, and Delete** tasks.
- Implements pagination for task listings.
- Uses JWT authentication for secure access.

## 📜 License
MIT

🔹 Developed with ❤️ using Node.js, Express, MongoDB & Angular

