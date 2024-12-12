import axios from 'axios';
import { useMemo } from 'react';

const useAxios = () => {
  const instance = useMemo(() => {
    const baseURL = import.meta.env.VITE_REACT_APP_SERVER_URL || 'http://localhost:3030/';
    const axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return axiosInstance;
  }, []);

  const request = (method = 'GET', url, data = null, config = {}) => {
    return instance.request({
      method,
      url,
      data,
      ...config,
    });
  };

  return request;
};

export default useAxios;