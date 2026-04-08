const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerifiedSeller: { type: Boolean, default: false } // Required for Feature 4 [cite: 74, 81]
});

module.exports = mongoose.model('User', UserSchema);