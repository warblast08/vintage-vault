const router = require('express').Router();
const Item = require('../models/item');
const jwt = require('jsonwebtoken');

// Route to create a new vintage item listing
router.post('/create', async (req, res) => {
    try {
        const { title, description, price, category, sellerId, sellerEmail } = req.body;

        // Create a new instance of the Item model with data from the request body
        const newItem = new Item({
            title,
            description,
            price,
            category,
            sellerId,
            sellerEmail
        });

        // Save the listing to the database and return the saved object
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ message: "Error creating listing", error: err });
    }
});

// Route to retrieve all listings for the marketplace
router.get('/all', async (req, res) => {
    try {
        // Fetch all items and use 'populate' to bring in the seller's verified status
        const items = await Item.find().populate('sellerId', 'isVerifiedSeller');
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to retrieve specific listings posted by a single user
router.get('/user-listings/:userId', async (req, res) => {
    try {
        // Find items where the sellerId matches the parameter provided in the URL
        const userItems = await Item.find({ sellerId: req.params.userId });
        res.status(200).json(userItems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user listings", error: err });
    }
});

module.exports = router;