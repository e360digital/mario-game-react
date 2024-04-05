// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config({ path: '.var.env' });

mongoose.connect(process.env.DATABASE);

// Middleware to verify the token and extract the user ID
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
  if (!token) {
     return res.status(403).json({ message: 'No token provided' });
  }
 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
     if (err) {
       return res.status(500).json({ message: 'Failed to authenticate token' });
     }
     req.userId = decoded.userId;
     next();
  });
 };



app.use('/api/auth', cors({
    origin: true,

  }), authRoutes);

  // Route to save scores
app.post('/api/save-score',  async (req, res) => {
  try {
     const { score } = req.body;
     const newScore = new Score({
       userId: req.userId,
       score,
     });
 
     await newScore.save();
     res.status(200).json({ message: 'Score saved successfully' });
  } catch (error) {
     res.status(500).json({ message: 'Error saving score', error });
  }
 });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
