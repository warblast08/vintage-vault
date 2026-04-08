const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  itemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
  },
  buyerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  price: Number,
  title: String,
  purchaseDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);