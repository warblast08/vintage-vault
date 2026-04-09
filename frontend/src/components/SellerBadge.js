import React from 'react';

const SellerBadge = ({ isVerified }) => {
  // Only show the badge if the verification status is true
  if (!isVerified) return null;

  return (
    <span style={{
      backgroundColor: '#e3f2fd',
      color: '#0d47a1',
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: '10px',
      border: '1px solid #bbdefb'
    }}>
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        style={{ marginRight: '4px' }}
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      Verified Seller
    </span>
  );
};

export default SellerBadge;