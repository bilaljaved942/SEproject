import axios from 'axios';

// Create a reusable axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default API;