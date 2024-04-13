// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Score = require('./models/Score'); 


const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config({ path: '.var.env' });

mongoose.connect(process.env.DATABASE);

// Middleware to verify the token and extract the user ID
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
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

// Save scores API
app.post('/api/save-score', verifyToken, async (req, res) => {
  // Log request headers to inspect token sending
  console.log('Request Headers:', req.headers);

  // Extract the token from the Authorization header
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Invalid token format' });
  }

  const token = authorizationHeader.split(' ')[1];

  // Verify and decode the token
  try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;

      console.log('User ID from token:', userId);

      // Continue processing the request...
  } catch (error) {
      console.error('Failed to authenticate token:', error);
      return res.status(403).json({ message: 'Failed to authenticate token' });
  }
});

   
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
