
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { Home } from './components/Home';
import FresherDetails from './components/FresherDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/fresherdetails" element={<FresherDetails />} />
    </Routes>
  );
};

export default App;
