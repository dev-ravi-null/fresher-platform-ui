import axios from 'axios';
import { toast } from 'react-toastify';  // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for the toast notifications

const api = axios.create({
  baseURL: 'https://fresher-backend.onrender.com/api',
});

// Create a function to handle toast notifications based on the response
const handleResponse = (response) => {
  // Check if the response is successful
  if (response.status === 200) {
    toast.success('Request was successful!');
  } else {
    toast.error('Something went wrong!');
  }
};

const handleError = (error) => {
  if (error.response) {
    // If the server responded with a status outside of the 2xx range
    toast.error(error.response.data.message || 'An error occurred');
  } else {
    // If there is no response (like network error)
    toast.error('Network error, please try again!');
  }
};

export const loginUser = (credentials) => {
  return api
    .post('/auth/fresher/login', credentials)
    .then(handleResponse)  // Handle success
    .catch(handleError);   // Handle errors
};

export const signupUser = (data) => {
  return api
    .post('/signup', data)
    .then(handleResponse)  // Handle success
    .catch(handleError);   // Handle errors
};

export default api;
