import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "/api" 
    : "https://freelancer-crm-backend.onrender.com/api",
});

export default api;
