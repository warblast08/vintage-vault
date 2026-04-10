import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const Auth = () => {
  // State management for user credentials and toggling between Login/Register modes
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dynamically set the API endpoint based on the current mode
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await axios.post(`http://localhost:5000${url}`, { email, password });
      
      if (isLogin) {
        // Upon successful login, persist session data and user traits in local storage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);
        localStorage.setItem('isVerified', res.data.user.isVerifiedSeller);
        localStorage.setItem('userEmail', res.data.user.email);
        
        // Redirect the user to their personal dashboard
        window.location.href = '/dashboard'; 
      } else {
        // If registering, notify the user and switch them to the login view
        alert('Registration complete! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      alert('Authentication failed: ' + (err.response?.data || 'Server error'));
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <h1 className="logo-text">Vintage Vault</h1>
        <h2 className="title-text">{isLogin ? 'Sign in' : 'Create account'}</h2>
        <p className="subtitle-text">Use your Vintage Vault Account</p>

        <form onSubmit={handleSubmit} className="form-style">
          {/* Captures user email for authentication/registration */}
          <input 
            type="email" 
            placeholder="Email" 
            className="input-style"
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {/* Captures user password; handled securely on the backend via hashing */}
          <input 
            type="password" 
            placeholder="Password" 
            className="input-style"
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <div className="action-wrapper">
            {/* Toggle link to switch between login and registration states */}
            <span 
              onClick={() => setIsLogin(!isLogin)} 
              className="toggle-link"
            >
              {isLogin ? 'Create account' : 'Sign in instead'}
            </span>
            <button type="submit" className="primary-button">
              {isLogin ? 'Next' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;