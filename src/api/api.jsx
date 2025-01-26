import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials } from '../redux/authSlice';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: 'https://fresher-backend.onrender.com/api',
});


const handleResponse = (response, navigate, dispatch) => {
  if (response.status === 200) {
    const { token } = response.data;

    // Decode the token to extract user details
    const decodedToken = jwtDecode(token); // Decodes the token
    const userId = decodedToken.id; // Adjust this based on your token structure
    const role = decodedToken.role;

    toast.success('Login successful!');

    // Store token and user details in localStorage or sessionStorage
    localStorage.setItem('token', token); // Or use sessionStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);

    // Dispatch credentials to Redux store
    dispatch(setCredentials({ userId, token, role }));

    // Navigate based on user role
    if (role === 'fresher') {
      navigate('/dashboard');
    } else if (role === 'recruiter') {
      navigate('/recruiter-view');
    } else {
      navigate('/');
    }
  } else {
    toast.error('Unexpected response!');
  }
};


export const getUser = (data, navigate) => {
  return api
    .post('/auth/fresher/signup', data)
    .then((response) => handleResponse(response, navigate))
    .catch((error) => handleError(error, navigate)); // Handle errors and navigate
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
export const loginUser = (credentials, navigate, dispatch) => {
  return api
    .post('/auth/fresher/login', credentials)
    .then((response) => handleResponse(response, navigate, dispatch))
    .catch((error) => handleError(error, navigate));
};

export const signupUser = (data, navigate) => {
  return api
    .post('/auth/fresher/signup', data)
    .then((response) => handleResponse(response, navigate))
    .catch((error) => handleError(error, navigate)); // Handle errors and navigate
};


export const uploadPhoto = (data) => {
  return api
    .post('/fresher-details/upload-resume', data)
    .then((response) => {
      toast.success('Photo uploaded successfully!');
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
      throw error;
    });
};
export const uploadResume = (data) => {
  return api
    .post('/fresher-details', data)
    .then((response) => {
      toast.success('Photo uploaded successfully!');
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
      throw error;
    });
};
export default api;
