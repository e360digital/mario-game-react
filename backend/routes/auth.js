// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Secret Key, use this to sign and verify, must be same in both functions or else validation will fail. //
// wwDcXecrzQvWFr2_pOGz1oR6ngE4nIEzDLJSGPA-aoQ                                                           //
// ////////////////////////////////////////////////////////////////////////////////////////////////////////


const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.status(201).send();
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
   //  const user = await User.findOne({ username });
   const user = {};
   user.id = 42;
    if (user ) {
       const token = jwt.sign({ user: user.id }, 'wwDcXecrzQvWFr2_pOGz1oR6ngE4nIEzDLJSGPA-aoQ', {expiresIn : '24h'} );
      
       res.json({ token });
    } else {
       res.status(401).send();
    }
   });
   

module.exports = router;
