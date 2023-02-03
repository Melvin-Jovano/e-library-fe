import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {refreshToken, logout} from './api/auth';
import axios from 'axios';
import ClientSocket from './loaders/socket';
import './assets/css/base.css';
import App from './App.vue';
import router from './router';
import piniPluginPersistedState from 'pinia-plugin-persistedstate';

let isRefresh = true;

axios.interceptors.response.use(response => {
  return response;
}, async (err) => {
  try {
    const originalRequest = err.config;
    if (err.response.data.message === 'EXPIRED_TOKEN') {
      const isRefreshNewInstance = isRefresh;
  
      if (isRefreshNewInstance) {
        isRefresh = false;
        
        const refreshUserToken = await refreshToken();
        if(refreshUserToken.data.message !== 'SUCCESS') {
          await logout();
          localStorage.clear();
          router.go('/login');
        }
  
        localStorage.setItem('accessToken', refreshUserToken.data.data.accessToken);
        localStorage.setItem('refreshToken', refreshUserToken.data.data.refreshToken);
  
        isRefresh = true;
        originalRequest.headers.Authorization = `Bearer ${refreshUserToken.data.data.accessToken}`;
        return await axios.request(originalRequest);
      } else {
        return await axios.request(originalRequest);
      }
  
    } else if (err.response.data.message === 'INVALID_TOKEN') {
      await logout();
      localStorage.clear();
      router.go('/login');
    }
    return Promise.reject(err);
  } catch (error) {
    return Promise.reject(err);
  }
});

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniPluginPersistedState);
app.use(pinia);
app.use(router);
app.mount('#app');

import session from './stores/session';
import appStores from './stores/app';

const sessionStores = session();
const appStore = appStores();

export const orderSocket = new ClientSocket('/order', 3001);

orderSocket.socket.on('created-order', (order) => {
  if(order.user_id === sessionStores.userId) {
    appStore.orderCount++;
  }
});

orderSocket.socket.on('deleted-order', (order) => {
  if(order.user_id === sessionStores.userId) {
    appStore.orderCount--;
  }
});

orderSocket.socket.on('total-order', (body) => {
  if(body.user_id === sessionStores.userId) {
    appStore.orderCount = body.total;
  }
});