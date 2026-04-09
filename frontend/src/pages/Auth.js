import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(`http://localhost:5000${url}`, { email, password });
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);
        localStorage.setItem('isVerified', res.data.user.isVerifiedSeller);
        localStorage.setItem('userEmail', res.data.user.email);
        
        window.location.href = '/dashboard'; 
      } else {
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
          <input 
            type="email" 
            placeholder="Email" 
            className="input-style"
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-style"
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <div className="action-wrapper">
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