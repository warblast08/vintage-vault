import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateListing.css';

const CreateListing = () => {
  // Local state to manage the form inputs for a new vintage listing
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Shirts', 
  });

  // Updates the state dynamically as the user types into the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve the current user's ID and Email from local storage to assign ownership
    const sellerId = localStorage.getItem('userId'); 
    const sellerEmail = localStorage.getItem('userEmail');

    // Security check: Ensure the user is still logged in before allowing a post
    if (!sellerId) {
      alert("User session expired. Please log in again.");
      return;
    }

    try {
      // Send the item data and seller information to the backend API
      await axios.post('http://localhost:5000/api/items/create', {
        ...formData,
        sellerId: sellerId,
        sellerEmail: sellerEmail
      });
      
      alert('Listing created successfully!');
      // Redirect to the dashboard to view the newly created listing
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      alert('Error creating listing');
    }
  };

  return (
    <div className="create-listing-wrapper">
      <div className="listing-card">
        <h2 className="listing-title">List a Vintage Item</h2>
        <p className="listing-subtitle">Showcase your treasure to the marketplace</p>

        <form onSubmit={handleSubmit} className="form-container">
          {/* Inputs for item details: title, description, and price */}
          <input 
            name="title" 
            placeholder="Item Title (e.g., 1990s Denim Jacket)" 
            onChange={handleChange} 
            required 
            className="input-field" 
          />
          
          <textarea 
            name="description" 
            placeholder="Tell us about the condition, size, and history..." 
            onChange={handleChange} 
            required 
            className="textarea-field" 
          />
          
          <input 
            name="price" 
            type="number" 
            placeholder="Price ($)" 
            onChange={handleChange} 
            required 
            className="input-field" 
          />
          
          {/* Dropdown to categorize the item for easier filtering in the marketplace */}
          <select name="category" onChange={handleChange} className="select-field">
            <option value="Shirts">Shirts</option>
            <option value="Jackets">Jackets</option>
            <option value="Pants">Pants</option>
            <option value="Accessories">Accessories</option>
          </select>
          
          <button type="submit" className="submit-button">
            Post Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;