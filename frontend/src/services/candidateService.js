import api from './api';

export const candidateService = {
  list: async () => (await api.get('/candidates')).data,
  get: async (id) => (await api.get(`/candidates/${id}`)).data,
  create: async (candidate) => (await api.post('/candidates', candidate)).data,
  update: async (id, candidate) => (await api.put(`/candidates/${id}`, candidate)).data,
  remove: async (id) => (await api.delete(`/candidates/${id}`)).data,
};
