import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { user, setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#00cc66', color: '#fff', padding: '0.7rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Login</button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>New Customer? <Link to="/register">Register Here</Link></p>
    </div>
  );
};

export default LoginScreen;