import React, { useEffect, useState } from 'react';
import SellerBadge from '../components/SellerBadge';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({ email: '', isVerified: false });
  const [history, setHistory] = useState([]);
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const isVerified = localStorage.getItem('isVerified') === 'true';
    const userId = localStorage.getItem('userId');
    
    setUser({ email, isVerified });

    const fetchData = async () => {
      try {
        const historyRes = await axios.get(`http://localhost:5000/api/transactions/history/${userId}`);
        setHistory(historyRes.data);

        const listingsRes = await axios.get(`http://localhost:5000/api/items/user-listings/${userId}`);
        setMyListings(listingsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    if (userId) fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="welcome-text">
          Welcome, <span>{user.email}</span>
          <div className="badge-container">
            <SellerBadge isVerified={user.isVerified} />
          </div>
        </h1>
      </header>

      <section className="activity-section">
        <h3 className="section-title">Your Activity</h3>
        
        <div className="grid-container">
          <div className="dashboard-card">
            <div className="card-header">
              <h4 className="card-title">Your Active Listings</h4>
              <Link to="/create-listing" style={{ textDecoration: 'none' }}>
                <button className="add-button">+ New Listing</button>
              </Link>
            </div>
            
            <div className="list-container">
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

          <div className="dashboard-card">
            <div className="card-header">
              <h4 className="card-title">Order History</h4>
            </div>
            
            <div className="list-container">
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