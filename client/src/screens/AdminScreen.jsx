import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const AdminScreen = () => {
  const { user } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Fruits');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 🚨 Security Gate: Agar user logged in nahi hai ya Admin nahi hai, toh use bhaga do
    if (!user || !user.isAdmin) {
      alert('Access Denied: Admins Only!');
      navigate('/');
    }
  }, [user, navigate]);

  // 1. Photo Upload Handler (Multer connection)
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    setMessage('Uploading image file...');

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
      
      setImage(data.imageUrl); // URL state mein save ho gaya
      setMessage('✓ Image uploaded successfully to server!');
    } catch (error) {
      setMessage('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // 2. Submit Complete Product Form
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('Validation Error: Please upload an image first!');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Admin Token verification
        },
      };

      await axios.post('http://localhost:5000/api/products', {
        name,
        price: Number(price),
        description,
        category,
        stock: Number(stock),
        image,
      }, config);

      setMessage('🚀 Success: Product published to database!');
      setName(''); setPrice(''); setDescription(''); setStock(''); setImage('');
    } catch (error) {
      setMessage('Error publishing product metadata.');
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: '12px', backgroundColor: '#fff' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Panel: Add Product 🛠️</h2>
      {message && <p style={{ backgroundColor: '#f4f4f4', padding: '0.8rem', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}
      
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Stock Count</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Grocery">Grocery</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Description</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc', resize: 'none' }}></textarea>
        </div>

        {/* File Image Upload Field */}
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px dashed #00cc66', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Product Image File</label>
          <input type="file" onChange={uploadFileHandler} style={{ width: '100%' }} />
          {uploading && <p style={{ color: '#ff9900', margin: '0.5rem 0 0 0' }}>Processing upload engine...</p>}
        </div>

        <button type="submit" style={{ width: '100%', backgroundColor: '#111', color: '#fff', padding: '0.8rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}>
          Publish Product To Store 🚀
        </button>
      </form>
    </div>
  );
};

export default AdminScreen;