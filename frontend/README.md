# Frontend Developer Intern Task - Easy2Ride (Notes demo)

## Overview

Small fullstack app with JWT auth, profile, notes CRUD, search/filter.

## Tech Stack

- Frontend: React (Vite), Bootstrap, Axios
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- Dev DB: MongoDB Atlas (or local Docker)

## Run locally

### Backend

cd backend
cp .env.example .env

# edit .env to set MONGO_URI and JWT_SECRET

npm install
npm run dev

### Frontend

cd frontend
cp .env.example .env

# set VITE_API_URL to backend (e.g. http://localhost:5000/api)

npm install
npm run dev

## Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/profile (protected)
- GET/POST/PUT/DELETE /api/notes (protected)

## Notes about scaling & security

(Paste the scaling & security notes from the assignment response.)

## Contact

Ayush Prasad
