const router = require('express').Router();
const Item = require('../models/item');
const jwt = require('jsonwebtoken');

router.post('/create', async (req, res) => {
    try {
        const { title, description, price, category, sellerId, sellerEmail } = req.body;

        const newItem = new Item({
            title,
            description,
            price,
            category,
            sellerId,
            sellerEmail
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ message: "Error creating listing", error: err });
    }
});

router.get('/all', async (req, res) => {
    try {
        const items = await Item.find().populate('sellerId', 'isVerifiedSeller');;
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user-listings/:userId', async (req, res) => {
    try {
        const userItems = await Item.find({ sellerId: req.params.userId });
        res.status(200).json(userItems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user listings", error: err });
    }
});

module.exports = router;