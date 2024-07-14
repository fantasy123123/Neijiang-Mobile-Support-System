// axiosInstance.js
import axios from 'axios';
import { Message } from '@arco-design/web-react';

// 获取 token 的方法，可以根据实际情况调整
const getToken = () => {
  return "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjUsInJvbGVJZCI6MywiZXhwIjoxNzIxMTMwNzcyfQ.BioCic6UatreLv2WdLVlihJncMEtUbXEzBjRm7c5ML8"
  // return localStorage.getItem('token');
};

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8090',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，添加 token 到请求头
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['token'] = token; // 或者根据实际情况设置 token 名称
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器，可以在这里统一处理响应错误
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    Message.error('Network Error!');
    return Promise.reject(error);
  }
);

export default axiosInstance;
