import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use((response) => {
  const method = response.config.method?.toLowerCase();
  if (['post', 'put', 'patch', 'delete'].includes(method) && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ats:data-changed'));
    try {
      window.localStorage.setItem('ats:data-changed', String(Date.now()));
    } catch {
      // Same-tab updates still work if browser storage is unavailable.
    }
  }
  return response;
});

export default api;
