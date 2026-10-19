import api from './api';

export const jobService = {
  list: async () => (await api.get('/jobs')).data,
  get: async (id) => (await api.get(`/jobs/${id}`)).data,
  create: async (job) => (await api.post('/jobs', job)).data,
  update: async (id, job) => (await api.put(`/jobs/${id}`, job)).data,
  remove: async (id) => (await api.delete(`/jobs/${id}`)).data,
};
