# 🧠 Second Brain

A full-stack personal knowledge management application that acts as your extended digital memory. Curate, organize, and retrieve links, articles, YouTube videos, tweets, and documents all in one unified dashboard—with shareable brain links for collaboration.

---

## ✨ Features

- **🔐 User Authentication**: Secure sign-up and sign-in powered by JWT authentication and password hashing (bcrypt).
- **📌 Multi-Type Content Aggregator**: Save and view diverse content formats:
  - 🎥 **YouTube Videos** (embedded previews)
  - 🐦 **Tweets / X Posts**
  - 📄 **Documents & Notes**
  - 🔗 **Web Links & Articles**
- **🏷️ Tagging & Filtering**: Categorize content with tags for quick retrieval.
- **🔗 Share Your Brain**: Generate a public, shareable link to let others view your curated knowledge base.
- **⚡ Fast & Modern UI**: Built with React, Vite, Tailwind CSS, and TypeScript for a responsive experience.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js & Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod (Schema & Input validation)
- **Security**: JSON Web Tokens (JWT) & bcrypt

---

## 📁 Project Structure

```bash
secondBrain/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── user.ts       # Auth & content CRUD endpoints
│   │   │   ├── brain.ts      # Shareable brain link endpoints
│   │   │   └── index.ts      # Main API router (/api/v1)
│   │   ├── db.ts             # MongoDB schemas & models
│   │   ├── Middleware.ts     # JWT auth middleware
│   │   ├── utils.ts          # Helper utilities
│   │   └── index.ts          # Server entry point (Port 3000)
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AuthCard.tsx           # Sign-in / Sign-up card component
    │   │   ├── Card.tsx               # Content card (YouTube, Twitter, Links)
    │   │   ├── CreateContentModel.tsx # Add new content modal
    │   │   ├── Sidebar.tsx            # Navigation sidebar
    │   │   └── Button.tsx             # Reusable UI button component
    │   ├── pages/
    │   │   ├── AuthPage.tsx           # Authentication view
    │   │   └── Dashboard.tsx          # Main dashboard view
    │   ├── App.tsx                    # Route definitions
    │   └── main.tsx                   # React root entry
    ├── package.json
    └── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

---

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your database & secrets:
   - Ensure MongoDB is running locally or specify your MongoDB connection string in `src/db.ts`.
   - Set your JWT secret in `src/config.ts`.

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   > Server will start at `http://localhost:3000`

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > Client will run at `http://localhost:5173`

---

## 📡 API Reference

Base URL: `http://localhost:3000/api/v1`

### Authentication (`/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/users/signup` | Register a new user | ❌ |
| `POST` | `/users/signin` | Authenticate user & return JWT | ❌ |

### Content Management (`/users/content`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/users/content` | Add new content (link, tweet, video, doc) | ✅ |
| `GET` | `/users/content` | Fetch all content created by user | ✅ |
| `DELETE` | `/users/content` | Delete a content item | ✅ |

### Brain Sharing (`/brain`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/brain/share` | Toggle / create a public share link | ✅ |
| `GET` | `/brain/:shareLink` | Access a shared second brain by hash | ❌ |

---

## 🗺️ Roadmap

- [ ] Search and filter by tags in dashboard
- [ ] Twitter embed preview integration
- [ ] Markdown rich text editor for notes
- [ ] AI-assisted auto-tagging and summarization

---

## 📝 License

This project is licensed under the [ISC License](LICENSE).
