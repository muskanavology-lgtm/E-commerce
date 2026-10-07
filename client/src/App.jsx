import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import CartScreen from './screens/CartScreen';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  return (
    <ShopProvider>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
        </Routes>
      </main>
    </ShopProvider>
  );
}

export default App;