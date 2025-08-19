# 📝 Questly – AI-Powered Prep for Every Role, Every Level

[**Live Demo**](https://ai-interview-prep-p31c28oro.vercel.app/)

**Questly** is a full-stack **MERN** application that helps candidates prepare for interviews in a structured and personalized way. Users can log in, select their **role**, **experience level**, and **topics to focus on**, and the app generates tailored interview questions. Each question includes the option to **"Learn More"** for deeper concept explanations, ensuring both practice and learning. 👉 *AI-Powered Prep for Every Role, Every Level.*

---

## 🚀 Tech Stack

| Layer           | Technology                                                                   |
| --------------- | ---------------------------------------------------------------------------- |
| Frontend        | React, Vite, React Router, Tailwind CSS, Axios, React Hot Toast, React Icons |
| Backend         | Node.js, Express.js                                                          |
| Database        | MongoDB (via Mongoose)                                                       |
| AI              | Google Gemini API (for questions & explanations)                             |
| Media Storage   | Cloudinary (for uploads)                                                     |
| Auth & Security | JWT-based auth, bcrypt (or similar), CORS                                    |
| Deployment      | Vercel (frontend), Render/Railway/Heroku (backend)                           |

---

## ✨ Features

- **Personalized Interview Prep** – Users log in, select their role, experience level, and focus topics.
- **AI-Generated Questions** – Dynamically generate important interview questions for the chosen path.
- **Learn More Explanations** – Click a question to view a detailed AI-powered concept explanation.
- **Session Management** – Save, manage, and revisit past sessions.
- **Authentication** – Secure login and protected API routes using JWT.
- **File Upload & Media** – Cloudinary integration for media handling.
- **Responsive UI** – Tailwind-based clean design that works across devices.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB URI (Atlas or local)
- Google Gemini API key
- Cloudinary account & API keys

---

### 1) Clone & Install

```bash
git clone https://github.com/SaiVardhanNP/Questly.git
cd Questly

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 2) Environment Variables

Create **two** `.env` files—one in `backend/` and one in `frontend/`.

\`\`

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

\`\` (Vite)

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### 3) Run the App (Local)

```bash
# Terminal 1 – Backend
cd backend
npm run dev   # or: npm start

# Terminal 2 – Frontend
cd frontend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
Questly/
├── backend/
│   ├── controllers/        # Auth, AI generation (questions + explanations), sessions, questions
│   ├── models/             # User, Session, Question schemas
│   ├── routes/             # /auth, /sessions, /questions, /ai endpoints
│   ├── middleware/         # Auth middleware (JWT protect)
│   ├── config/             # Database connection
│   ├── app.js              # Express app setup
│   └── server.js           # Server bootstrap
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components (inputs, cards, layouts)
│   │   ├── pages/          # Auth pages, Dashboard, Interview, LearnMore
│   │   ├── layouts/        # Layout wrappers (DashboardLayout, etc.)
│   │   ├── utils/          # axiosInstance, API_PATHS, helpers
│   │   ├── App.jsx         # Routes
│   │   └── main.jsx        # Entry point
│   └── public/
```

---

## 🔐 Routes Overview

### Auth

- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – User login (returns JWT)

### Sessions

- `GET /api/sessions` – Get user’s interview sessions
- `POST /api/sessions` – Create new session

### Questions

- `GET /api/questions` – Fetch question bank
- `POST /api/questions` – Add new question (admin)

### AI-Powered

- `POST /api/ai/generate-questions` – Generate interview questions (protected)
- `POST /api/ai/generate-explanation` – Generate detailed concept explanation (protected)

---

## 🔧 Scripts

```json
// backend/package.json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}

// frontend/package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🙌 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feat/your-feature`
5. Open a PR

---

## 📄 License

MIT License

---

## 🔗 Links

- Repo: [https://github.com/SaiVardhanNP/Questly](https://github.com/SaiVardhanNP/Questly)
- Live: [https://ai-interview-prep-flame-gamma.vercel.app/](https://ai-interview-prep-p31c28oro.vercel.app/)

