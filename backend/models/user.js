const mongoose = require('mongoose');

// Define the schema for user accounts and authentication data
const UserSchema = new mongoose.Schema({
  // Unique email used for login and identification
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // Hashed password for secure account access
  password: { 
    type: String, 
    required: true 
  },
  // Boolean flag to identify trusted sellers (Seller Badge feature)
  isVerifiedSeller: { 
    type: Boolean, 
    default: false 
  }
});

// Export the User model for use in registration, login, and authorization logic
module.exports = mongoose.model('User', UserSchema);