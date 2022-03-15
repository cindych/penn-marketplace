import { Route, Routes } from 'react-router-dom';

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Seller from './seller/components/Seller';
import Item from './buyer/components/Item';
import Checkout from './buyer/components/Checkout';
import Login from './Login/components/Login';
import Account from './account/Account';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/seller" element={<Seller />} />
      <Route path="/item" element={<Item />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  </div>
);

export default App;
