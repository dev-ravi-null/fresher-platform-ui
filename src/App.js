import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toastify
import Login from './components/Login';
import Signup from './components/Signup';
import { Home } from './components/Home';
import FresherDetails from './components/FresherDetails';
import Dashboard from './components/Dashbaord';  // Uncomment when Dashboard is ready
import PostLogin from './components/PostLogin';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fresherdetails" element={<FresherDetails />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/dashbaord" element={<PostLogin />} />

      </Routes>
      <ToastContainer
        position="top-center"  // Position in the middle of the top
        autoClose={5000}  // Hold for 5 seconds
        hideProgressBar={false}  // Show progress bar
        newestOnTop={false}  // Show new toasts below the previous ones
        closeOnClick  // Close on clicking the toast
        pauseOnHover  // Pause when hovered
        draggable  // Draggable
        pauseOnFocusLoss  // Pause when the window loses focus
      />   </div>
  );
};

export default App;
