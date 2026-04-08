const router = require('express').Router();
const Transaction = require('../models/transaction');
const Item = require('../models/item');

// POST: Process a purchase
router.post('/buy', async (req, res) => {
    try {
        const { itemId, buyerId, sellerId, price, title } = req.body;

        // 1. Create the transaction record
        const newTransaction = new Transaction({
            itemId,
            buyerId,
            sellerId,
            price,
            title
        });
        await newTransaction.save();

        // 2. Remove the item from the marketplace (it's sold!)
        await Item.findByIdAndDelete(itemId);

        res.status(201).json({ message: "Purchase successful!" });
    } catch (err) {
        res.status(500).json({ message: "Transaction failed", error: err });
    }
});

// GET: Fetch history for a specific user
router.get('/history/:userId', async (req, res) => {
    try {
        const history = await Transaction.find({
            $or: [{ buyerId: req.params.userId }, { sellerId: req.params.userId }]
        });
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;