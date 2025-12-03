require('dotenv').config();
import express, { json } from 'express';
import connectDB from './config/db';
import cors from 'cors';

const app = express();
connectDB();

app.use(json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

import auth from './middleware/auth';
import { findById } from './models/User';

app.get('/api/profile', auth, async (req, res) => {
  try {
    const user = await findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
