import axios from 'axios';

const api = axios.create({
  baseURL: "https://freelancer-crm-backend.onrender.com"
});

export default api;
