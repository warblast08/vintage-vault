import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if a user is logged in by verifying the presence of an auth token
  const isLoggedIn = !!localStorage.getItem('token');

  // Prevent the Navbar from rendering on the login/landing page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navbar-container">
      {/* Branding section that redirects to the user dashboard */}
      <div 
        onClick={() => navigate('/dashboard')} 
        className="nav-logo"
      >
        <span>📦</span>
        Vintage Vault
      </div>
      
      {/* Navigation Links: Content changes based on the user's login status */}
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <span onClick={() => navigate('/marketplace')} className="nav-link">
              Marketplace
            </span>
            <span onClick={() => navigate('/dashboard')} className="nav-link">
              Dashboard
            </span>
            {/* Logout functionality: Clears local storage and redirects to login */}
            <span 
              onClick={() => { localStorage.clear(); navigate('/'); }} 
              className="logout-link"
            >
              Logout
            </span>
          </>
        ) : (
          /* Show login link only if the user is currently signed out */
          <span onClick={() => navigate('/')} className="nav-link">
            Login
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;