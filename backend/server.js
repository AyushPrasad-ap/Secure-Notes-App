// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import auth from './middleware/auth.js';
import User from './models/User.js';

dotenv.config();
const app = express();

// If running behind a proxy (e.g. Vercel, Heroku, Render) enable trust proxy
// so secure cookies and rate limiter detect client IP correctly in production.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Connect DB
connectDB();

// ---------------------- Security middlewares ---------------------- //

// Set secure HTTP headers
app.use(helmet());

// Basic Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", process.env.CLIENT_URL || 'http://localhost:5173'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:'],
    },
  })
); 

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS (allow frontend origin) — must be before sanitizers that may throw
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));

// Parse cookies
app.use(cookieParser());

// Simple NoSQL injection protection (safe for Express v5)
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== "object") return;
    for (const key in obj) {
      if (key.startsWith("$")) delete obj[key];
      else if (typeof obj[key] === "object") sanitize(obj[key]);
    }
  };
  sanitize(req.body);
  sanitize(req.params);
  sanitize(req.query);
  next();
});


// ---------------------- Rate limiting ---------------------- //
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // limit each IP to 8 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: 'Too many requests from this IP, please try again later.' },
});
app.use('/api/auth', authLimiter);

// ---------------------- Routes ---------------------- //
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Profile route (protected)
app.get('/api/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Not Found' });
});

// Basic centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ msg: err.message || 'Server error' });
});

// ---------------------- Start ---------------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
