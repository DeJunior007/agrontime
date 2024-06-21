// api.js

import axios from 'axios';

const baseUrl = 'https://back-agrontime.onrender.com';
const apiKey = 'secretApiKey';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
});

export const criarUsuario = async (usuario) => {
  try {
    const response = await axiosInstance.post('/usuarios', usuario);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const atualizarUsuario = async (usuario) => {
  try {
    const response = await axiosInstance.patch('/usuarios/update', usuario);
    return response.data;
  } catch (error) {
    throw error;
  }
};
