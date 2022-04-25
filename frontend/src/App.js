import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import { SocketContext, socket } from './homepage/components/Socket';

import Seller from './seller/components/Seller';
import Item from './buyer/components/Item';
import Checkout from './buyer/components/Checkout';
import Login from './Login/components/Login';
import Account from './account/Account';
import Homepage from './homepage/components/Homepage';
import Header from './homepage/components/Header';
import Cart from './buyer/components/Cart';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // check the user is logged in via the cookies
  const checkUserLoggedIn = async () => {
    try {
      const user = await axios.get('/account/user');
      if (Object.keys(user.data).length > 0) {
        setUsername(user.data.name);
        setLoggedIn(true);
      }
    } catch (error) {
      Error('There was an error with getting the user information');
    }
  };

  // logs the user out
  const userLoggedOut = async () => {
    try {
      socket.emit('leave room');
      const user = await axios.post('/account/logout');
      if (user) {
        setLoggedIn(false);
        navigate('/login');
        setUsername('');
      }
    } catch (error) {
      Error('There was an error with logging out');
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  });

  useEffect(() => {
    if (username !== '') {
      socket.emit('join room', username);
    }
  }, [username]);

  useEffect(() => {
    socket.on('new message', (data) => {
      toast(`${data} has messaged you!`, { position: 'bottom-right' });
    });

    socket.on('new follow', (data) => {
      toast(`${data} has followed you!`, { position: 'bottom-right' });
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Header username={username} loggedIn={loggedIn} userLoggedOut={userLoggedOut} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/item" element={<Item />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </SocketContext.Provider>
  );
};

export default App;
