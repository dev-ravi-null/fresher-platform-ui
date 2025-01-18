
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fresher-backend.onrender.com/api',
});

export const loginUser = (credentials) => api.post('/auth/fresher/login', credentials);
export const signupUser = (data) => api.post('/signup', data);

export default api;
