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
    try {
      const revision = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem('ats:data-changed', revision);
    } catch {
      // The active page still refreshes after its own successful mutation.
    }
  }
  return response;
});

export default api;
