// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config({ path: '.var.env' });

mongoose.connect(process.env.DATABASE);

app.use('/api/auth', cors({
    origin: true,

  }), authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
