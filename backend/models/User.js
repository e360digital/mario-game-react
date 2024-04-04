// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
 username: { type: String, required: true, unique: true },
 password: { type: String, required: true },
});

UserSchema.pre('save', function(next) {
 if (!this.isModified('password')) return next();
 this.password = bcrypt.hashSync(this.password, 10);
 next();
});

UserSchema.methods.comparePassword = function(plaintext) {
 // Directly return the result of the comparison
 return bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model('User', UserSchema);
