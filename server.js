const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serves login.html, register.html, etc.

// Routes
app.use('/api/auth', authRoutes);

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Connect to MongoDB, then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
  });
