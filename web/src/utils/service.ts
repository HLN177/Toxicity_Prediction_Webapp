import axios from "axios";
import { notification } from 'antd';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 100000,
  withCredentials: true
});

service.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    const {message, response} = err;
    notification['error']({
      message: message,
      description: response.data
    });
    return Promise.reject(err);
  }
);

export default service;