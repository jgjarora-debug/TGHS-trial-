import api from './api';

export const candidateService = {
  list: async (params) => (await api.get('/candidates', { params })).data,
  get: async (id) => (await api.get(`/candidates/${id}`)).data,
  create: async (candidate) => (await api.post('/candidates', candidate)).data,
  update: async (id, candidate) => (await api.put(`/candidates/${id}`, candidate)).data,
  archive: async (id) => (await api.patch(`/candidates/${id}/archive`)).data,
  restore: async (id) => (await api.patch(`/candidates/${id}/restore`)).data,
  remove: async (id) => (await api.delete(`/candidates/${id}`)).data,
};
