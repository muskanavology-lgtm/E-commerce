import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const PlaceOrderScreen = () => {
  const { cartItems, setCartItems, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 40; 
  const totalPrice = itemsPrice + shippingPrice;

  useEffect(() => {
    if (!user) navigate('/login');
    if (!shippingAddress.address) navigate('/shipping');
  }, [user, navigate, shippingAddress]);

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const orderPayload = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress,
        paymentMethod: 'Cash on Delivery',
        itemsPrice,
        shippingPrice,
        totalPrice,
      };

      await axios.post('http://localhost:5000/api/orders', orderPayload, config);
      
      setCartItems([]);
      localStorage.removeItem('cartItems');
      
      alert('Order Placed Successfully! 🎉');
      navigate('/'); 
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Review Your Order</h2>
        <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <h3>Delivery Address</h3>
          <p>{user?.name}, {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
        </div>
        <div style={{ padding: '1rem' }}>
          <h3>Order Items</h3>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid #f9f9f9' }}>
              <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
              <Link to={`/product/${item._id}`} style={{ flex: 1, textDecoration: 'none', color: '#111' }}>{item.name}</Link>
              <div>{item.qty} x ₹{item.price} = <b>₹{item.qty * item.price}</b></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: '1px solid #eee', padding: '1.5rem', borderRadius: '12px', backgroundColor: '#f9f9f9', height: 'fit-content' }}>
        <h3 style={{ marginTop: 0 }}>Order Summary</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Items Price:</span> <span>₹{itemsPrice}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span>Shipping:</span> <span>₹{shippingPrice}</span>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #ccc' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
          <span>Total:</span> <span style={{ color: '#00cc66' }}>₹{totalPrice}</span>
        </div>
        <button onClick={placeOrderHandler} style={{ width: '100%', backgroundColor: '#00cc66', color: '#fff', padding: '0.8rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>
          Place Order 🚀
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;