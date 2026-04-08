const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration [cite: 48, 52]
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Route in backend/routes/auth.js
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send the verification status along with the token
    res.status(200).json({ 
      token, 
      user: { 
          id: user._id, 
          email: user.email,
          isVerifiedSeller: user.isVerifiedSeller // Pass the status here 
      } 
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;