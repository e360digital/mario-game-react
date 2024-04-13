// models/Score.js
const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 },
 score: {
    type: Number,
    required: true
 }
});

module.exports = mongoose.model('Score', ScoreSchema);
