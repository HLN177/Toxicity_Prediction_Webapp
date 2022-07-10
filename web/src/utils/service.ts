import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import { notification } from 'antd';
import history from "../services/history";

const service = axios.create({
  baseURL: '/',
  timeout: 100000,
  withCredentials: true
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    };
    return config;
  }
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.headers['x-access-token']) {
      const newAccessToken = res.headers['x-access-token'];
      localStorage.setItem('accessToken', newAccessToken);
    }
    return res.data;
  },
  err => {
    const {message, response} = err;
    notification['error']({
      message: message,
      description: response.data
    });
    if (response.status === 403) {
      localStorage.removeItem('accessToken');
      history.replace('/');
    }
    return Promise.reject(err);
  }
);

export default service;