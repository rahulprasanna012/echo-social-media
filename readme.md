# Echo — Social Media (MERN)

A minimal social network built on the **MERN** stack with JWT auth, posts, likes, comments, and profile management.



<p align="left">
  <a href="https://nodejs.org/"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-18+-gray?logo=node.js"></a>
  <a href="https://expressjs.com/"><img alt="Express" src="https://img.shields.io/badge/Express-5-gray?logo=express"></a>
  <a href="https://www.mongodb.com/"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Atlas%2FLocal-gray?logo=mongodb"></a>
  <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-18-gray?logo=react"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-gray?logo=typescript"></a>
  <a href="https://cloudinary.com/"><img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-optional-gray?logo=cloudinary"></a>
</p>

---

## ✨ Features

- 🔐 **Auth** — register, login, logout (JWT; optional http-only cookies)
- 👤 **Profiles** — view/update current user
- 📝 **Posts** — create/read/delete with labels/tags
- 💬 **Comments** & 👍 **Likes**
- 🖼️ **Image uploads** (optional via Cloudinary)
- 🌐 **CORS** configured for a separate frontend origin
- 🚀 **Coolify (Traefik)**-friendly deployment

---

## 🧱 Tech Stack

- **Frontend:** React + TypeScript (Vite or CRA), fetch/axios
- **Backend:** Node.js, Express 5, Mongoose (MongoDB)
- **Auth:** JWT (Bearer); cookie storage optional
- **Media (optional):** Cloudinary
- **Deployment:** Coolify on your VPS (Traefik reverse proxy)

---

## 📦 Monorepo

```
echo-social-media/
├─ client/                 # React app (TypeScript)
└─ server/                 # Node/Express API (MongoDB, JWT)
```

### Minimal Architecture

```
[ React (client) ]  ←—— fetch/axios ——→  [ Express API ]  ←—— Mongoose ——→  [ MongoDB ]
           ↑                                     │
        CORS                                     └—— (optional) Cloudinary SDK → [ Cloudinary ]
```

---

## 🚀 Getting Started (Local)

### Prerequisites
- Node.js **18+**
- MongoDB (local or Atlas)
- (Optional) Cloudinary account

### 1) Clone
```bash
git clone https://github.com/rahulprasanna012/echo-social-media.git
cd echo-social-media
```

### 2) Server setup
```bash
cd server
npm install
```

Create a `.env` in `server/`:
```env
# ---------- Server ----------
PORT=3000                                # or 5000; keep in sync with Coolify "Internal Port"
ORIGIN=YOUR SITES

# ---------- Database ----------
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# ---------- Auth ----------
JWT_SECRET=supersecretvalue
JWT_EXPIRES_IN=7d

# ---------- (Optional) Cloudinary ----------
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

Run the API:
```bash
# prod-style start (as seen in logs)
npm start                   # runs: node src/server.js

# dev mode (if nodemon is configured)
npm run dev
```

Health check:
```bash
curl -i http://localhost:3000/api/health
# → 200 OK
```

### 3) Client setup
```bash
cd ../client
npm install
```

Create a `.env` in `client/` (Vite format shown):
```env

for local dev
# VITE_API_BASE=http://localhost:3000
```

Run the app:
```bash
npm run dev       # Vite dev server (http://localhost:5173 by default)
# or, if using CRA:
npm start
```

---

## 🔌 API Overview (REST)

Base URL: `${VITE_API_BASE}` (client) or `http://localhost:<PORT>` (local)

> **Auth**
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — login, returns JWT
- `POST /api/auth/logout` — invalidate/clear cookie (if used)
- `GET  /api/auth/me` — current user (requires `Authorization: Bearer <token>`)

> **Users / Profiles**
- `GET  /api/users/:id` — get public profile
- `PATCH /api/users/me` — update current user

> **Posts**
- `GET    /api/posts` — list posts (`?tag=xxx` supported)
- `POST   /api/posts` — create post (auth)
- `GET    /api/posts/:id` — read one
- `DELETE /api/posts/:id` — delete (owner or admin)

> **Comments & Likes**
- `POST   /api/posts/:id/comments` — add comment
- `DELETE /api/comments/:id` — delete comment (owner or admin)
- `POST   /api/posts/:id/like` — like/unlike toggle

> **Health**
- `GET /api/health` — liveness probe

> **Notes**
- All protected routes expect `Authorization: Bearer <JWT>`.
- If you enable cookie storage, ensure `SameSite=None` and HTTPS in production.

---

## 🌍 CORS

The server reads `ORIGIN` from env and allows that origin for credentials if enabled.

**Checklist**  
- Set `ORIGIN='YOUR SITE` (prod)  
- For local dev with Vite: `ORIGIN=http://localhost:5173`  
- If using cookies, configure `credentials: true` on both server CORS and client fetch/axios.

---

## 🖼️ Optional: Cloudinary

1. Create a Cloudinary account and get `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
2. Add them to `server/.env`.
3. In the client, upload via your API (server signs/handles uploads) or use unsigned uploads with caution.

---

## 🛠️ NPM Scripts

**server/**
- `start` — `node src/server.js`
- `dev` — `nodemon src/server.js` (if configured)
- `lint`, `test` — *(optional placeholders)*

**client/**
- `dev` — Vite dev server
- `build` — production build
- `preview` — preview build
- `start` — CRA dev server (if CRA is used)

## Demo 
https://social.prasannanxtwave.site