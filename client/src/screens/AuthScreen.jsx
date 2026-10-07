import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthScreen = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLoginMode) {
        // 1. Hit Backend User Login Route
        const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
        setMessage('Success: Authenticated successfully!');
        onLoginSuccess(data); // Save user data globally
        navigate('/'); // Redirect to Home Page
      } else {
        // 2. Hit Backend User Register Route
        const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password });
        setMessage('Success: Account created! Please log in now.');
        setIsLoginMode(true); // Switch to login screen view
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Authentication failed. Verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2.5rem', border: '1px solid #eef0f2', borderRadius: '16px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <h2 style={{ fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
        {isLoginMode ? 'Welcome Back' : 'Create Account'}
      </h2>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        {isLoginMode ? 'Log in to manage your orders and cart.' : 'Register to start shopping groceries.'}
      </p>

      {message && (
        <p style={{ padding: '0.6rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', backgroundColor: message.includes('Success') ? '#e6f9f0' : '#ffebe6', color: message.includes('Success') ? '#00cc66' : '#ff3300', marginBottom: '1rem' }}>
          {message}
        </p>
      )}

      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {!isLoginMode && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.95rem' }} 
          />
        )}
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.95rem' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.95rem' }} 
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '0.8rem', backgroundColor: '#111111', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', marginTop: '0.5rem' }}
        >
          {loading ? 'Processing...' : isLoginMode ? 'Sign In' : 'Register Account'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
        <span 
          onClick={() => setIsLoginMode(!isLoginMode)} 
          style={{ color: '#00cc66', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLoginMode ? 'Sign Up' : 'Log In'}
        </span>
      </div>
    </div>
  );
};

export default AuthScreen;