import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // thanks to Vite proxy
});

export default api;
