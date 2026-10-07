import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
const CartScreen = () => {
  const { cartItems, setCartItems, addToCart, user } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }
  const removeFromCartHandler = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };
  const qtyChangeHandler = (product, qty) => {
    addToCart(product, Number(qty));
  };
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '12px', textAlign: 'center' }}>
          <h3>Your cart is empty.</h3>
          <Link to="/" style={{ color: '#00cc66', fontWeight: 'bold', textDecoration: 'none' }}>Go Back Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '1px solid #eee', borderRadius: '12px', backgroundColor: '#fff' }}>
                <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: '#111', fontWeight: '600' }}>
                    {item.name}
                  </Link>
                  <div style={{ fontWeight: '700', marginTop: '0.3rem' }}>₹{item.price}</div>
                </div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) => addToCart(item, Number(e.target.value))} // 🚨 FIX: Number pass karna zaroori hai
                    style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer' }}
                  >
                    {[...Array(item.stock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFromCartHandler(item._id)}
                  style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#ff3333' }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          <div style={{ border: '1px solid #eee', padding: '2rem', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Subtotal Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span>Total Items:</span>
              <span style={{ fontWeight: '600' }}>{totalItems} items</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total Price:</span>
              <span style={{ color: '#00cc66' }}>₹{totalPrice}</span>
            </div>

            <button
              onClick={checkoutHandler}
              style={{
                width: '100%',
                backgroundColor: '#111',
                color: '#fff',
                padding: '1rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              Proceed To Checkout 🚀
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartScreen;