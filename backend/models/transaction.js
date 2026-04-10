const mongoose = require('mongoose');

// Define the schema for recording sales and purchases within the marketplace 
const TransactionSchema = new mongoose.Schema({
  // Reference to the specific vintage item being sold 
  itemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
  },
  // Reference to the user who purchased the item 
  buyerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Reference to the user who listed the item 
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  price: Number,
  title: String,
  // Automatically capture the date and time the transaction was completed 
  purchaseDate: { 
    type: Date, 
    default: Date.now 
  }
});

// Export the Transaction model for use in order history and checkout logic 
module.exports = mongoose.model('Transaction', TransactionSchema);