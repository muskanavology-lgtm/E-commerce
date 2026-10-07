import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ShippingScreen = () => {
  const { user } = useContext(ShopContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).address : '');
  const [city, setCity] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).city : '');
  const [postalCode, setPostalCode] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).postalCode : '');
  const [country, setCountry] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).country : '');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
    navigate('/placeorder'); // Navigates to Final Checkout Review
  };

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: '12px', backgroundColor: '#fff' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Shipping Address 📍</h2>
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>Postal Code</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#111', color: '#fff', padding: '0.8rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Continue to Order Summary</button>
      </form>
    </div>
  );
};

export default ShippingScreen;