import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
  const { user, cartItems, wishlist, logout } = useContext(ShopContext);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?search=${keyword}`);
    } else {
      navigate('/');
    }
  };
  const categories = ['All', 'Fruits', 'Vegetables', 'Electronics', 'Fashion', 'Grocery'];
  return (
    <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', sticky: 'top', zIndex: 100 }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '800', color: '#00cc66', textDecoration: 'none' }}>ShopSphere.</Link>

        {/* Search Engine */}
        <form onSubmit={searchSubmitHandler} style={{ display: 'flex', flex: 1, maxWidth: '500px', margin: '0 2rem' }}>
          <input
            type="text"
            placeholder="Search Fruits, Veg, Fashion........."
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: '100%', padding: '0.6rem 1rem', border: '1px solid #ccc', borderRadius: '20px 0 0 20px', outline: 'none' }}
          />
          <button type="submit" style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '0 1.5rem', borderRadius: '0 20px 20px 0', cursor: 'pointer' }}>🔍</button>
        </form>

        {/* Action Menus */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/wishlist" style={{ textDecoration: 'none', color: '#333' }}>❤️ Wishlist ({wishlist.length})</Link>
              <Link to="/cart" style={{ textDecoration: 'none', color: '#333', fontWeight: '600' }}>🛒 Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</Link>
   <Link to="/profile" style={{ textDecoration: 'none', color: '#111', fontWeight: '700', backgroundColor: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '20px' }}>
      👤 Hello, {user.name}
    </Link>
              {user && user.isAdmin && (
                <Link to="/admin" style={{ color: '#ff9900', fontWeight: 'bold', textDecoration: 'none', marginLeft: '10px' }}>
                  Admin Panel 🛠️
                </Link>
              )}
              <button onClick={logout} style={{ border: '1px solid #111', background: 'transparent', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: '#111', fontWeight: '700' }}>Sign In</Link>
          )}
        </div>
      </div>

      {/* Dynamic Amazon Categories Strip Layout */}
      <div style={{ backgroundColor: '#232f3e', padding: '0.5rem 2rem', display: 'flex', gap: '2rem', overflowX: 'auto' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(cat === 'All' ? '/' : `/?category=${cat}`)}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', whiteSpace: 'nowrap' }}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
};
export default Navbar;