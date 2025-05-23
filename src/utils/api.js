import axios from 'axios';

// 👇 Usa tu IP local (no "localhost") si usas Expo Go en tu celular
const api = axios.create({
  baseURL: 'http://localhost:3000', // Ej: 'http://192.168.1.100:3000'
  timeout: 5000, // opcional
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
