import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SellerBadge from '../components/SellerBadge';
import '../styles/Marketplace.css';

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBuy = async (item) => {
    const buyerId = localStorage.getItem('userId');
    if (!buyerId) {
      alert("Please log in to buy items.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/transactions/buy', {
        itemId: item._id,
        buyerId: buyerId,
        sellerId: item.sellerId,
        price: item.price,
        title: item.title
      });

      alert(`Success! You bought the ${item.title}.`);
      setItems(items.filter(i => i._id !== item._id));
    } catch (err) {
      console.error(err);
      alert("Transaction failed.");
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items/all');
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="marketplace-wrapper">
      <header className="marketplace-header">
        <h2 className="marketplace-title">Vintage Marketplace</h2>
        <p className="marketplace-subtitle">Discover unique treasures from verified sellers.</p>
      </header>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name or category (e.g. Jackets)..." 
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="marketplace-grid">
        {filteredItems.map((item) => (
          <div key={item._id} className="item-card">
            <div className="image-wrapper">
              <img src={item.imageUrl} alt={item.title} className="item-image" />
            </div>

            <div className="card-content">
              <div className="item-main-header">
                <h3 className="item-title-text">{item.title}</h3>
                <span className="item-price-tag">${item.price}</span>
              </div>
              <p className="item-category-label">{item.category}</p>
              
              <div className="seller-footer">
                <div className="seller-info-box">
                  <small className="seller-email-small">
                    Curated by {item.sellerEmail ? item.sellerEmail.split('@')[0] : 'Unknown'}
                  </small>
                  {item.sellerId?.isVerifiedSeller && (
                    <div style={{ marginLeft: '5px', transform: 'scale(0.8)' }}>
                      <SellerBadge isVerified={true} />
                    </div>
                  )}
                </div>
              </div>

              <button onClick={() => handleBuy(item)} className="buy-button">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;