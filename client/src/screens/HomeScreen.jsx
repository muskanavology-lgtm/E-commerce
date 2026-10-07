import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(ShopContext);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    // 🚨 STAGE GATE: If user is not logged in, force redirect immediately to Login screen
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProducts = async () => {
      // Dynamic endpoint mapping reads '?category=Fruits' or '?search=Apple' cleanly
      const { data } = await axios.get(`http://localhost:5000/api/products${search}`);
      setProducts(data);
    };
    fetchProducts();
  }, [search, user, navigate]);

  if (!user) return null;

  return (
    <div style={{ maxWidth: '1300px', margin: '2rem auto', padding: '0 2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Explore Products</h2>
      {products.length === 0 ? (
        <h3>No matching products found.</h3>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {products.map((product) => (
            <div key={product._id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '12px', textAlign: 'center', backgroundColor: '#fff' }}>
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '1rem' }}>
                  <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '0.8rem', color: '#00cc66', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.category}</span>
                <h3 style={{ margin: '0.5rem 0' }}>{product.name}</h3>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>₹{product.price}</div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;