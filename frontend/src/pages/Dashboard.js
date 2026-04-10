import React, { useEffect, useState } from 'react';
import SellerBadge from '../components/SellerBadge';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // State to store user profile info, order history, and personal listings
  const [user, setUser] = useState({ email: '', isVerified: false });
  const [history, setHistory] = useState([]);
  const [myListings, setMyListings] = useState([]);

  // useEffect hook to initialize user data and fetch activity from the backend
  useEffect(() => {
    // Retrieve session data stored in local storage during login
    const email = localStorage.getItem('userEmail');
    const isVerified = localStorage.getItem('isVerified') === 'true';
    const userId = localStorage.getItem('userId');
    
    setUser({ email, isVerified });

    // Asynchronous function to gather all user-specific data from the API
    const fetchData = async () => {
      try {
        // Fetch transaction history (both buys and sells) for the current user
        const historyRes = await axios.get(`http://localhost:5000/api/transactions/history/${userId}`);
        setHistory(historyRes.data);

        // Fetch active listings created by the current user
        const listingsRes = await axios.get(`http://localhost:5000/api/items/user-listings/${userId}`);
        setMyListings(listingsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    // Only attempt to fetch data if a valid userId is present
    if (userId) fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="welcome-text">
          Welcome, {" "} <span>{user.email}</span>
          {/* Display the trust badge if the user is a verified seller */}
          <div className="badge-container">
            <SellerBadge isVerified={user.isVerified} />
          </div>
        </h1>
      </header>

      <section className="activity-section">
        <h3 className="section-title">Your Activity</h3>
        
        <div className="grid-container">
          {/* Section for managing the user's active marketplace listings */}
          <div className="dashboard-card">
            <div className="card-header">
              <h4 className="card-title">Your Active Listings</h4>
              <Link to="/create-listing" style={{ textDecoration: 'none' }}>
                <button className="add-button">+ New Listing</button>
              </Link>
            </div>
            
            <div className="list-container">
              {/* Dynamically render listing items */}
              {myListings.length > 0 ? (
                myListings.map((item) => (
                  <div key={item._id} className="list-item">
                    <div className="item-main-info">
                      <div className="item-title">{item.title}</div>
                      <div className="item-subtext">{item.category}</div>
                    </div>
                    <div className="item-price">${item.price}</div>
                  </div>
                ))
              ) : (
                <p className="empty-text">You haven't listed any items yet.</p>
              )}
            </div>
          </div>

          {/* Section for viewing the user's past marketplace transactions */}
          <div className="dashboard-card">
            <div className="card-header">
              <h4 className="card-title">Order History</h4>
            </div>
            
            <div className="list-container">
              {/* Map through transaction records to display purchase dates and titles */}
              {history.length > 0 ? (
                history.map((tx) => (
                  <div key={tx._id} className="list-item">
                    <div className="item-main-info">
                      <div className="item-title">{tx.title}</div>
                      <div className="item-subtext">Purchased on {new Date(tx.purchaseDate).toLocaleDateString()}</div>
                    </div>
                    <div className="item-price">${tx.price}</div>
                  </div>
                ))
              ) : (
                <p className="empty-text">No recent transactions found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;