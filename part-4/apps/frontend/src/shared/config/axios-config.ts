import axios from 'axios';
import { useAccessToken } from '../models';
import { useAlertStore } from '../models';

const UNAUTHORIZED = 401;

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAccessToken.getState().accessToken;

    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;
    const { message }: { message: string | string[] } = data;
    const alert = (Array.isArray(message) ? message : [message]).map(
      (text) => ({ error: true, success: false, message: text })
    );
    useAlertStore.setState({
      alert: [...alert, ...useAlertStore.getState().alert],
    });

    if (status === UNAUTHORIZED) {
      useAccessToken.setState({ accessToken: null });
      window.localStorage.removeItem('jwt');
    }
    return Promise.reject(error);
  }
);
