const router = require('express').Router();
const Transaction = require('../models/transaction');
const Item = require('../models/item');

// Route to process a purchase between a buyer and a seller
router.post('/buy', async (req, res) => {
    try {
        const { itemId, buyerId, sellerId, price, title } = req.body;

        // Create and save a new transaction record in the database
        const newTransaction = new Transaction({
            itemId,
            buyerId,
            sellerId,
            price,
            title
        });
        await newTransaction.save();

        // Once purchased, remove the item from the 'Item' collection so it's no longer for sale
        await Item.findByIdAndDelete(itemId);

        res.status(201).json({ message: "Purchase successful!" });
    } catch (err) {
        res.status(500).json({ message: "Transaction failed", error: err });
    }
});

// Route to retrieve the transaction history for a specific user
router.get('/history/:userId', async (req, res) => {
    try {
        // Find all transactions where the user is either the buyer OR the seller to display activity
        const history = await Transaction.find({
            $or: [{ buyerId: req.params.userId }, { sellerId: req.params.userId }]
        });
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;