import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  // Hide Navbar on the Auth/Login page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navbar-container">
      <div 
        onClick={() => navigate('/dashboard')} 
        className="nav-logo"
      >
        <span>📦</span>
        Vintage Vault
      </div>
      
      {/* Navigation Links */}
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <span onClick={() => navigate('/marketplace')} className="nav-link">
              Marketplace
            </span>
            <span onClick={() => navigate('/dashboard')} className="nav-link">
              Dashboard
            </span>
            <span 
              onClick={() => { localStorage.clear(); navigate('/'); }} 
              className="logout-link"
            >
              Logout
            </span>
          </>
        ) : (
          <span onClick={() => navigate('/')} className="nav-link">
            Login
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;