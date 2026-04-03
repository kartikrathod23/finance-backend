# Finance Data Processing and Access Control Backend

This project is a backend system for a finance dashboard where users can manage financial records based on their roles.
The goal of this implementation was to focus on clean structure, correct logic, and clear separation of responsibilities rather than adding unnecessary complexity.

---

## Tech Stack

* Node.js + Express
* TypeScript
* PostgreSQL
* Prisma ORM

---

## Project Structure

The project follows a modular structure where each feature is isolated.

```
src/
  modules/ -> (each contains their own service file, controller, routes and typescript types file)
    auth/
    finance/
    dashboard/
    user/

  middleware/
  prisma/
  types/
  utils/

  app.ts
  server.ts
```
For example:
```
Example:
```
/module/auth/
  auth.controller.ts
  auth.service.ts
  auth.routes.ts
  auth.types.ts


### Why modular structure?

I chose modular structure implementation over separating only controllers and routes globally, because
1. modules group everything related to a feature together
For example:

* `finance` module has controller, service, routes, types in one place

This improves:

* readability
* maintainability
* scalability (easy to extend features)

2. It will be really easy for evaluators to evaluate my implementation.

---

## Features Implemented

### 1. User and Role Management

* Users can be created and managed
* Roles supported:

  * ADMIN
  * ANALYST
  * VIEWER

* Admin can:

  * update user roles
  * activate/deactivate users

Role-based access is enforced using middleware.

---

### 2. Authentication

* JWT-based authentication
* Passwords are hashed using bcrypt
* Token is required for protected routes

---

### 3. Financial Records

Each record contains:

* amount
* type (INCOME / EXPENSE)
* category
* date
* notes

Supported operations:

* create
* read
* update
* delete (soft delete)

Additional features:

* filtering (type, category, date range)
* pagination
* search (category + notes)

---

### 4. Dashboard APIs

Implemented summary endpoints:

* total income
* total expense
* net balance
* category-wise totals
* recent activity
* monthly trends

These are computed using aggregation queries and service-level logic.

---

### 5. Access Control

Role-based access control is implemented using middleware:

* Viewer -> read only
* Analyst -> read + insights
* Admin -> full access

This is enforced at route level.

---

### 6. Validation and Error Handling

* Basic input validation implemented using custom helper
* Centralized error handling using custom `AppError`
* Consistent response format for success cases

---

### 7. Additional Enhancements

* Pagination for records
* Search support
* Soft delete (records not removed permanently)
* Rate limiting using express-rate-limit

---

## API Endpoints

### Auth

* **POST /api/auth/register**
  Registers a new user

* **POST /api/auth/login**
  Authenticates user and returns JWT

---

### Users (Admin only)

* **GET /api/users**
  Fetch all users

* **PUT /api/users/:id/role**
  Update user role

* **PUT /api/users/:id/status**
  Activate / deactivate user

---

### Finance

* **POST /api/finance**
  Create financial record

* **GET /api/finance**
  Get records (supports filtering, pagination, search)

* **PUT /api/finance/:id**
  Update record

* **DELETE /api/finance/:id**
  Soft delete record

Query params:

* type
* category
* startDate / endDate
* page / limit
* search

---

### Dashboard

* **GET /api/dashboard/summary**
  Returns total income, expense, balance

* **GET /api/dashboard/categories**
  Category-wise aggregation

* **GET /api/dashboard/recent**
  Recent transactions

* **GET /api/dashboard/trends**
  Monthly trends

---
### Users (Admin only)

All user management APIs are restricted to ADMIN role.

- **GET /api/users**  
  Fetch all users with their role and status  

- **PUT /api/users/:id/role**  
  Update the role of a user (ADMIN / ANALYST / VIEWER)  

  Example body:
  {
    "role": "ANALYST"
  }

- **PUT /api/users/:id/status**  
  Activate or deactivate a user  

  Example body:
  {
    "isActive": false
  }
---

## API Documentation

Postman Documentation:
👉 https://documenter.getpostman.com/view/39029383/2sBXiomViP

Postman collection JSON is also included in the repository.

---

## Sample API Responses

### Register

```
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@test.com",
    "role": "ADMIN"
  }
}
```

---

### Dashboard Summary

```
{
  "totalIncome": 11600,
  "totalExpense": 1700,
  "netBalance": 9900
}
```

---

## Assumptions Made

* Users can access only their own financial records
* Roles are fixed (ADMIN, ANALYST, VIEWER)
* Soft delete is used instead of permanent deletion
* Authentication is required for protected routes

---

## Tradeoffs and Design Decisions

* Used Prisma ORM for simplicity and type safety instead of writing raw SQL
* Used simple manual validation instead of libraries like Joi/Zod to keep implementation lightweight
* Rate limiting is implemented in-memory; for production, Redis-based rate limiting would be more suitable
* Dashboard aggregation is handled in service layer instead of database-level complex queries for clarity
* Did not implement automated tests as of now but it is intended to be done later and code structure allows easy addition using Jest and Supertest

---

## Testing

All APIs were manually tested using Postman, including:

* success cases
* validation failures
* role-based restrictions
* edge cases

A Postman collection can be shared for reference.

---

## How to Run

1. Clone the repository

```
git clone <your-repo-url>
cd finance-backend
```

---

2. Install dependencies

```
npm install
```

---

3. Setup environment variables

Copy `.env.example` to `.env`

```
cp .env.example .env
```

Update the following values:

```
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_secret_key
```

---

4. Run database migrations

```
npx prisma migrate dev
```

---

5. Start the server

```
npm run dev
```

---

Server will run at:

```
http://localhost:3000
```

---

## Final Note

I focused on building a clean and logically structured backend system with proper separation of concerns, rather than adding unnecessary complexity. 
Thank you for the opportunity - Zorvyn, had great experience working on this problem statement.
