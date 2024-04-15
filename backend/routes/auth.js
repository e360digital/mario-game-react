// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.status(201).send();
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.comparePassword(password)) {
       const token = jwt.sign({ sub: user.id }, 'SECRET_KEY');
      
       res.json({ token });
    } else {
       res.status(401).send();
    }
   });
   

module.exports = router;
