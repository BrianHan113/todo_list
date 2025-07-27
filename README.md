# 📜 Get It Done.

A modern, full-featured **Todo List web application** built with the **PERN stack** (PostgreSQL, Express.js, React, Node.js). This project showcases secure authentication, schema validation, a RESTful API, and a clean, visually engaging frontend with an interactive Three.js 3D model.

---

## 🚀 Deployment

The app is deployed and accessible at: [https://todo-list-52mz.onrender.com/](https://todo-list-52mz.onrender.com/)
(First request may take up to a minute due to using free tier on Render's hosting service)

## 🚀 Features

- ✅ **Fullstack PERN architecture** (PostgreSQL + Express + React + Node.js)
- 🔐 **JWT-based authentication** using **HTTP-only cookies**
- 🧾 **Schema validation** with **Joi** to enforce request correctness
- 🔀 **Drag-and-drop** task reordering and priority management
- 🖠️ Full **CRUD operations** for managing tasks
- 🌐 **RESTful API** design with clean separation of concerns
- 🎨 **Modern, responsive UI** built with React
- 🧪 **Interactive 3D model** rendered with **Three.js**

---

## 🛆 Tech Stack

### Frontend

- **React.js**
- **Three.js** (for 3D interaction)
- **Tailwind CSS**

### Backend

- **Node.js** + **Express.js**
- **PostgreSQL** with `pg` driver
- **JWT** (jsonwebtoken)
- **Joi** for schema validation
- **CORS**, **Helmet**, **dotenv**, **bcrypt**

---

## 📬 API Endpoints (RESTful)

- `POST /api/v1/auth/register` – Register user  
- `POST /api/v1/auth/login` – Login user  
- `POST /api/v1/auth/logout` – Logout (clears cookie)
- `GET /api/v1/tasks` – Fetch all tasks
- `POST /api/v1/tasks` – Create new task  
- `PATCH /api/v1/tasks/:id` – Update a task  
- `DELETE /api/v1/tasks/:id` – Delete a task
- `GET /api/v1/user` – Get User Info

> All Task and User routes are protected, and require a valid JWT in the cookie.
