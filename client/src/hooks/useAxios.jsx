import axios from 'axios';
import { useMemo } from 'react';

const useAxios = () => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL || 'http://localhost:3030/',
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);

  const request = (method, url, data = null, config = {}) => {
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