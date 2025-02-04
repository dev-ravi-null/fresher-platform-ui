import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials } from '../redux/authSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchDetailsSuccess, fetchDetailsFailure, fetchDetailsStart } from '../redux/fresherDetailsSlice';

const api = axios.create({
  baseURL: 'https://fresher-backend.onrender.com/api',
});
var userId = localStorage.getItem("userId")
const handleLoginResponse = (response, navigate, dispatch) => {
  if (response.status === 200) {
    const { token } = response.data;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const role = decodedToken.role;

    toast.success('Login successful!');
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    dispatch(setCredentials({ userId, token, role }));

    if (role === 'fresher') {
      getUserDetail(userId, dispatch);
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

const handleError = (error) => {
  if (error.response) {
    toast.error(error.response.data.message || 'Invalid Status');
  } else {
    toast.error('Network error, please try again!');
  }
  throw error;
};

export const loginUser = (credentials, navigate, dispatch) => {
  return api
    .post('/auth/fresher/login', credentials)
    .then((response) => handleLoginResponse(response, navigate, dispatch))
    .catch(handleError);
};

export const signupUser = (data, navigate) => {
  return api
    .post('/auth/fresher/signup', data)
    .then((response) => {
      toast.success('Signup successful! Please log in.');
      navigate('/login');
    })
    .catch(handleError);
};

export const getUserDetail = async (userId, dispatch) => {
  try {
    dispatch(fetchDetailsStart()); // Set loading state

    const response = await api.get(`/fresher-details/${userId}`); // Use GET request
    dispatch(fetchDetailsSuccess(response.data)); // Save data in Redux store

    return response.data; // Return data for further use
  } catch (error) {
    dispatch(fetchDetailsFailure(error.response?.data?.message || "Failed to fetch details"));
    console.error("Error fetching user details:", error);
  }
};

export const uploadPhoto = (data) => {
  return api
    .post('/fresher-details/upload-photo', data)
    .then((response) => {
      toast.success('Photo uploaded successfully!');
      return response.data;
    })
    .catch(handleError);
};

export const uploadResume = (data) => {
  return api
    .post('/fresher-details/upload-resume', data)
    .then((response) => {
      toast.success('Resume uploaded successfully!');
      return response.data;
    })
    .catch(handleError);
};

export const updateSkillsModal = (data, dispatch) => {
  return api
    .post('/fresher-details/add', data)
    .then((response) => {
      toast.success(response.data.message);
      getUserDetail(data.userId, dispatch);
      return response.data;
    })
    .catch(handleError);
};
export default api;
