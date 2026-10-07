import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProfileScreen = () => {
  const { user, setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  // Profile States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Pre-filling User Data
    setName(user.name);
    setEmail(user.email);

    // Fetching User Orders from Backend
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (err) {
        console.error('Orders fetch failed', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  // Profile Update Handler
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put('http://localhost:5000/api/users/profile', { name, email }, config);
      
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setMessage('✓ Profile Updated Successfully! 🎉');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '3rem', alignItems: 'start' }}>
      
      {/* LEFT COLUMN: USER PROFILE CARD (Flipkart Style) */}
      <div style={{ border: '1px solid #eee', padding: '2rem', borderRadius: '16px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#00cc66', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '0 auto 1rem auto' }}>
            {user.name[0].toUpperCase()}
          </div>
          <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Hello, {user.name}!</h3>
          <p style={{ color: '#777', fontSize: '0.9rem', marginTop: '0.2rem' }}>{user.isAdmin ? '👑 Store Admin' : '👤 Customer member'}</p>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid #eee', marginBottom: '1.5rem' }} />

        {message && <p style={{ color: message.includes('✓') ? '#00cc66' : 'red', fontWeight: '600', fontSize: '0.9rem', textAlign: 'center' }}>{message}</p>}

        <form onSubmit={updateProfileHandler}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', fontWeight: '600', color: '#555' }}>Update Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', fontWeight: '600', color: '#555' }}>Update Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ width: '100%', backgroundColor: '#111', color: '#fff', padding: '0.7rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>
            Save Changes
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: FLIPKART/MEESHO STYLE ORDER HISTORY */}
      <div style={{ border: '1px solid #eee', padding: '2rem', borderRadius: '16px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          📦 My Orders ({orders.length})
        </h2>

        {loadingOrders ? (
          <p>Loading your personal order vault...</p>
        ) : orders.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
            <p style={{ color: '#666', margin: 0 }}>You haven't placed any orders yet!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div key={order._id} style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '1.2rem', backgroundColor: '#fafafa' }}>
                
                {/* Header Sub-Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px dashed #ddd', paddingBottom: '0.8rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <div>Order ID: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{order._id}</span></div>
                  <div style={{ color: '#666' }}>Placed On: <b>{order.createdAt.substring(0, 10)}</b></div>
                </div>

                {/* Main Content Sub-Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                  
                  {/* Item Names Summary */}
                  <div>
                    {order.orderItems.map((item, index) => (
                      <div key={index} style={{ fontSize: '1rem', fontWeight: '600', color: '#222', marginBottom: '0.2rem' }}>
                        🛍️ {item.name} <span style={{ color: '#777', fontWeight: 'normal', fontSize: '0.85rem' }}>(x{item.qty})</span>
                      </div>
                    ))}
                  </div>

                  {/* Total Value Block */}
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111' }}>
                    ₹{order.totalPrice}
                  </div>

                  {/* Operational Delivery Status indicators */}
                  <div style={{ textAlign: 'right' }}>
                    {order.isDelivered ? (
                      <span style={{ color: '#00cc66', backgroundColor: '#e6f9f0', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}> Delivered ✓</span>
                    ) : (
                      <span style={{ color: '#ff9900', backgroundColor: '#fff5e6', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>⏳ In Transit</span>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfileScreen;