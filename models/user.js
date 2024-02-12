const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role:{
    type: String,
    default: "Admin",
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
