import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: 'https://fresher-backend.onrender.com/api',
});

// Handle successful responses
const handleResponse = (response, navigate) => {
  if (response.status === 200) {
    toast.success('Login successful!');
    navigate('/dashbaord'); // Navigate to the dashboard on success
  } else {
    toast.error('Unexpected response!');
  }
};

// Handle API errors
const handleError = (error, navigate) => {
  if (error.response) {
    // Handle specific error messages from the server
    toast.error(error.response.data.message || 'Login failed!');
  } else {
    // Handle network or unknown errors
    toast.error('Network error, please try again!');
  }
};

// Login User
export const loginUser = (credentials, navigate) => {
  return api
    .post('/auth/fresher/login', credentials)
    .then((response) => handleResponse(response, navigate))
    .catch((error) => handleError(error, navigate)); // Handle errors and navigate
};


export const signupUser = (data, navigate) => {
  return api
    .post('/auth/fresher/signup', data)
    .then((response) => handleResponse(response, navigate))
    .catch((error) => handleError(error, navigate)); // Handle errors and navigate
};

export default api;
