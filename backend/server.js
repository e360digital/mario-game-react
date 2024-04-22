// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/verifyToken');

const Score = require('./models/Score'); 


const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config({ path: '.var.env' });

// mongoose.connect(process.env.DATABASE);


app.use('/api/auth', cors({
    origin: true,

  }), authRoutes);

// Save scores API
app.post('/api/save-score',verifyToken, async (req, res) => {
    try {
      //  const userId = req.userId;
      //  const score = req.body.score; 
   
      //  // Create a new score document
      //  const newScore = new Score({
      //    userId: userId,
      //    score: score
      //  });
   
       // Save the score document to the database
      //  const savedScore = await newScore.save();
       const savedScore = "saved successfully!";
   
       // Respond with the saved score document
       res.status(201).json(savedScore);
    } catch (error) {
       console.error('Error saving score:', error);
       res.status(500).json({ message: 'Failed to save score' });
    }
   });
   

   
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
