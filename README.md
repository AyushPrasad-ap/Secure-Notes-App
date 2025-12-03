# 🔐 Secure Notes App

A modern full-stack web application for securely creating, managing, and storing personal notes.  
Built with **React + Vite**, **Node.js + Express**, **MongoDB**, **JWT Authentication**, and a clean **Glassmorphism UI**.

---

## 🚀 Live Demo

---

## 📁 Project Structure

```

Secure Notes App/
│
├── backend/ # Express.js backend (API + Auth + DB)
│ ├── server.js
│ ├── config/db.js
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ └── .env
│
└── frontend/ # React.js frontend (UI + API integration)
├── src/
│ ├── pages/
│ ├── components/
│ ├── api/
│ └── main.jsx
├── public/
├── .env
└── vite.config.js

```

---

# ✨ Features

## 🔐 Authentication

- JWT-based login & registration
- Password hashing using **bcryptjs**
- Protected dashboard route
- Automatic token validation
- Logout flow

## 🗒️ Notes Management

- Create, read, update, delete (CRUD) operations
- Notes linked to authenticated users
- Search notes by keywords
- Tags support
- Responsive notes grid layout
- Long notes scroll **inside** the card (max-height system)

## 🎨 Modern UI (Glassmorphism)

- Frosted-glass cards & containers
- Clean navbar with user greeting
- Background image with fixed overlay
- Styled input boxes to match glass design
- Minimal scrollbars
- Fully responsive design
- Bootstrap 5 + custom CSS

## ⚙️ Backend

- Node.js + Express REST API
- MongoDB Atlas database
- Mongoose for schema & validation
- Error handling middleware
- Secure routes using JWT middleware

## 🔒 Security

- Password hashing
- JWT authentication
- CORS protection
- Environment variables for secrets
- Proper API request validation

---

# 🛠️ Tech Stack

### **Frontend**

- React.js (Vite)
- React Router DOM
- Bootstrap 5
- Axios
- Lucide Icons
- Custom Glassmorphism CSS

### **Backend**

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- CORS

---

# ⚙️ Installation & Setup Instructions

## 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/secure-notes-app.git
cd secure-notes-app
```

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

### Create a `.env` file inside `/backend`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Start the backend server:

```bash
npm run dev
```

You should see:

```
MongoDB connected
Server running on port 5000
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
```

### Create a `.env` file inside `/frontend`:

```
VITE_API_URL=http://localhost:5000/api
```

### Start frontend:

```bash
npm run dev
```

Open the UI at:

```
http://localhost:5173
```

---

# 📚 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | /api/auth/register | Register user        |
| POST   | /api/auth/login    | Login user & get JWT |

### 👤 Profile

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | /api/profile | Get logged-in user |

### 🗒️ Notes

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/notes     | Get all notes   |
| POST   | /api/notes     | Create new note |
| PUT    | /api/notes/:id | Update note     |
| DELETE | /api/notes/:id | Delete note     |

---

# 🌐 Deployment Guide

You can deploy using:

### **Frontend**

- Vercel
- Netlify

### **Backend**

- Render
- Railway
- Cyclic
- AWS EC2

### Environment variables required for deployment:

Backend:

```
MONGO_URI=
JWT_SECRET=
```

Frontend:

```
VITE_API_URL=<your_backend_url>/api
```

---

# 🧪 Testing

Recommended tools:

- Postman
- Thunder Client (VS Code)
- Browser DevTools for API request logging

Test cases:

- Register → Dashboard
- Login → JWT saved in localStorage
- Create a note
- Delete a note
- Search notes
- Logout

---

# 📝 Future Improvements

- Edit Note Modal
- Rich-text editor for notes
- Dark/Light mode toggle
- Profile avatar & settings
- Recycle bin (soft delete)
- Tags filter sidebar
- Masonry-style notes layout
- Two-factor authentication

---

# 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss the proposal.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 🙋‍♂️ Author

**Ayush Prasad**
Full-Stack Developer
GitHub: [https://github.com/AyushPrasad-ap](https://github.com/AyushPrasad-ap)

LinkedIn: [https://www.linkedin.com/in/ayush-prasad-ap/](https://www.linkedin.com/in/ayush-prasad-ap/)
