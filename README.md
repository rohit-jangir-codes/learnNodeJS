# learnNodeJS — REST API with Express + PostgreSQL + JWT

A production-ready REST API built with **Node.js**, **Express**, **PostgreSQL**, and **JWT authentication**.

## 🚀 Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Setup environment variables
```
cp .env.example .env
# Fill in your PostgreSQL credentials and JWT secret in .env
```

### 3. Create database tables
```
psql -U your_user -d your_database -f schema.sql
```

### 4. Run the server
```
npm run dev
```

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint            | Auth     | Description         |
|--------|---------------------|----------|---------------------|
| POST   | /api/auth/register  | ❌ Public | Register a new user |
| POST   | /api/auth/login     | ❌ Public | Login & get token   |
| GET    | /api/auth/me        | ✅ JWT    | Get current user    |

### Homes Routes
| Method | Endpoint        | Auth     | Description              |
|--------|-----------------|----------|--------------------------|
| GET    | /api/homes      | ❌ Public | Get all homes            |
| GET    | /api/homes/:id  | ❌ Public | Get home by ID           |
| POST   | /api/homes      | ✅ JWT    | Create a new home        |
| PUT    | /api/homes/:id  | ✅ JWT    | Update a home (owner only) |
| DELETE | /api/homes/:id  | ✅ JWT    | Delete a home (owner only) |

---

## 🔐 JWT Usage

After login or register, you receive a token. Pass it in the Authorization header for protected routes:

```
Authorization: Bearer your_jwt_token_here
```

---

## 🗄️ Database Schema

- **users** — stores registered users with hashed passwords
- **homes** — stores registered homes linked to owner (user)