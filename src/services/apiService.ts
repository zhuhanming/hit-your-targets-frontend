import axios from 'axios';
// import qs from 'qs';
import humps from 'humps';
import tokenUtils from 'utils/tokenUtils';

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => humps.camelizeKeys(data), // takes care of case issues
  ],
  transformRequest: [
    (data) => humps.decamelizeKeys(data), // takes care of case issues
    ...axios.defaults.transformRequest,
  ],
});

ApiService.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getToken();
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default ApiService;
