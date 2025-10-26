import api from "./api";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5606';

export const register = (data: { name: string; email: string; password: string }) =>
  api.post(`${VITE_API_BASE_URL}/api/auth/register`, data);

export const login = (data: { email: string; password: string }) =>
  api.post(`${VITE_API_BASE_URL}/api/auth/login`, data);
