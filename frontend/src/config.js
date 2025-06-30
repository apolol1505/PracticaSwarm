// Configuración central para las URLs del API
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:4000/api'
  : 'http://192.168.99.101:4000/api';

export default API_BASE_URL; 