import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import FavouritesPage from '../pages/FavouritesPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductDetail from '../pages/ProductDetail';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = ({ dishes }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage dishes={dishes} />} />
      
      <Route path="/cart" element={<CartPage />} />
      
      <Route path="/checkout" element={<CheckoutPage />} />
      
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/profile" element={<ProfilePage />} />
      
      <Route path="/favourites" element={<FavouritesPage dishes={dishes} />} />
      
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default AppRoutes;
