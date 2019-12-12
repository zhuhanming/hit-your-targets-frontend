import axios from 'axios';
import tokenUtils from 'utils/tokenUtils';

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
});

ApiService.interceptors.request.use(
  config => {
    const token = tokenUtils.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(new Error(error));
  }
);

export default ApiService;