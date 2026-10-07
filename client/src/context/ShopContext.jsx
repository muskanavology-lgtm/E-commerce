import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null);
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
  const [wishlist, setWishlist] = useState(localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
  }, [wishlist]);
const addToCart = (product, qty) => {
  setCartItems((prevItems) => {
    const itemExists = prevItems.find((x) => x._id === product._id);
    if (itemExists) {
      return prevItems.map((x) =>
        x._id === product._id ? { ...x, qty: Number(qty) } : x
      );
    } else {
      return [...prevItems, { ...product, qty: Number(qty) }];
    }
  });
};
  const toggleWishlist = (product) => {
    const exist = wishlist.find((x) => x._id === product._id);
    if (exist) {
      setWishlist(wishlist.filter((x) => x._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };
  return (
    <ShopContext.Provider value={{ user, setUser, cartItems, setCartItems, wishlist, toggleWishlist, addToCart, logout }}>
      {children}
    </ShopContext.Provider>
  );
};