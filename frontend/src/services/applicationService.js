import api from './api';

export const applicationService = {
  list: async (params = {}) => (await api.get('/applications', { params })).data,
  create: async (application) => (await api.post('/applications', application)).data,
  updateStage: async (id, stage, note) => (await api.patch(`/applications/${id}/stage`, { stage, note })).data,
  updateOutcome: async (id, outcome) => (await api.patch(`/applications/${id}/outcome`, { outcome })).data,
};
