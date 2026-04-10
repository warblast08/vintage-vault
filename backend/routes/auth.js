const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route for new user registration
router.post('/register', async (req, res) => {
  try {
    // Hash the password before saving to ensure security
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword
    });
    // Save the user to the MongoDB collection
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user login and authentication
router.post('/login', async (req, res) => {
  try {
    // Check if a user exists with the provided email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found");

    // Compare the submitted password with the hashed password in the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    // Generate a JSON Web Token (JWT) for session management
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Return the token and essential user details to the frontend
    res.status(200).json({ 
      token, 
      user: { 
          id: user._id, 
          email: user.email,
          isVerifiedSeller: user.isVerifiedSeller
      } 
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;