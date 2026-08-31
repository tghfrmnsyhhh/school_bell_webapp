import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getSettings = () => axios.get(`${API_BASE_URL}/settings`);
export const updateSetting = (key, value) => axios.post(`${API_BASE_URL}/settings`, { key, value });

export const getSchedules = () => axios.get(`${API_BASE_URL}/schedules`);
export const createSchedule = (data) => axios.post(`${API_BASE_URL}/schedules`, data);
export const updateSchedule = (id, data) => axios.put(`${API_BASE_URL}/schedules/${id}`, data);
export const deleteSchedule = (id) => axios.delete(`${API_BASE_URL}/schedules/${id}`);

export const stopBellAudio = () => axios.post(`${API_BASE_URL}/stop-bell`);