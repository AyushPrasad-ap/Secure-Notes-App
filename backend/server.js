import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import auth from './middleware/auth.js';
import User from './models/User.js';

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Profile route
app.get('/api/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
