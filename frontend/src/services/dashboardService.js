import api from './api';

export const dashboardService = {
  summary: async () => (await api.get('/dashboard/summary')).data,
  health: async () => (await api.get('/health')).data,
};
