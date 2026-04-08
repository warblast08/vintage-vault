const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true // e.g., "Shirts", "Jackets", "Pants"
  },
  imageUrl: { 
    type: String, 
    default: "https://via.placeholder.com/150" // Placeholder until we add image uploads
  },
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sellerEmail: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Item', ItemSchema);