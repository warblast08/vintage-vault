import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateListing.css';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Shirts', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const sellerId = localStorage.getItem('userId'); 
    const sellerEmail = localStorage.getItem('userEmail');

    if (!sellerId) {
      alert("User session expired. Please log in again.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/items/create', {
        ...formData,
        sellerId: sellerId,
        sellerEmail: sellerEmail
      });
      alert('Listing created successfully!');
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