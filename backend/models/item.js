const mongoose = require('mongoose');

// Define the schema for vintage items listed in the marketplace 
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
    required: true
  },
  // Default placeholder image for all items
  imageUrl: { 
    type: String, 
    default: "https://via.placeholder.com/150"
  },
  // Link the item to a specific user in the 'User' collection 
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sellerEmail: String,
  // Automatically track when the listing was created 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Export the model for use in backend API routes 
module.exports = mongoose.model('Item', ItemSchema);