

import axios from 'axios';

let accessToken = '';

export const setAccessToken = (token) => {
  accessToken = token;
};

export const adminAxios = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/dashboard/admin`,
  withCredentials: true,
});

adminAxios.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default adminAxios;