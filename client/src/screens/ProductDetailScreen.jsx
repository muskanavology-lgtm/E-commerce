import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addToCart, toggleWishlist, wishlist, user } = useContext(ShopContext);

  useEffect(() => {
    // 🚨 Security Gate: If user is not logged in, boot them to login screen
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user, navigate]);

  if (!user) return null;
  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>Loading Product Details...</h2>;
  if (error) return <h2 style={{ textAlign: 'center', marginTop: '5rem', color: 'red' }}>{error}</h2>;
  if (!product) return <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>Product Not Found</h2>;

  const isAlreadyInWishlist = wishlist.some((x) => x._id === product._id);

  const handleAddToCart = () => {
    addToCart(product, Number(qty));
    navigate('/cart'); // Redirect to cart screen after adding
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
      
      {/* Left Column: Image Container */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', borderRadius: '16px', padding: '2rem', height: '450px', border: '1px solid #eee' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>

      {/* Right Column: Product Metadata & Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ color: '#00cc66', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
          {product.category}
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111' }}>{product.name}</h1>
        
        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#222', marginBottom: '1.5rem' }}>
          ₹{product.price}
        </div>

        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1.05rem' }}>
          {product.description}
        </p>

        <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '2rem' }} />

        {/* Purchase Operations Panel */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: '600', color: '#444' }}>Status:</span>
            <span style={{ fontWeight: '700', color: product.stock > 0 ? '#00cc66' : 'red' }}>
              {product.stock > 0 ? `In Stock (${product.stock} items left)` : 'Out of Stock'}
            </span>
          </div>

      {product.stock > 0 && (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
    <span style={{ fontWeight: '600', color: '#444' }}>Quantity:</span>
    <select 
      value={qty} 
      onChange={(e) => setQty(Number(e.target.value))} // 🚨 FIX: Value ko Number bana kar state mein save karo
      style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', cursor: 'pointer' }}
    >
      {[...Array(product.stock).keys()].map((x) => (
        <option key={x + 1} value={x + 1}> {x + 1} </option> // 🚨 FIX: Tag 'option' hona chahiye, 'key' nahi!
      ))}
    </select>
  </div>
)}
        </div>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              flex: 2,
              backgroundColor: product.stock === 0 ? '#ccc' : '#111',
              color: '#fff',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              color: isAlreadyInWishlist ? 'red' : '#333',
              border: `1px solid ${isAlreadyInWishlist ? 'red' : '#ccc'}`,
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isAlreadyInWishlist ? '❤️ Wishlisted' : '🤍 Wishlist'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailScreen;