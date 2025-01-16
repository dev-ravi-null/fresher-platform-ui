
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-endpoint.com/api',
});

export const loginUser = (credentials) => api.post('/login', credentials);
export const signupUser = (data) => api.post('/signup', data);

export default api;
