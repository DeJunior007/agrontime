import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-agrontime.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para criar um solo
export const criarSolo = async (soloData) => {
  try {
    const response = await api.post('/solo/criar-solo', soloData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar solo:', error);
    throw error;
  }
};

// Função para criar uma semente
export const criarSemente = async (sementeData) => {
  try {
    const response = await api.post('/semente/criar', sementeData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar semente:', error);
    throw error;
  }
};

// Função para buscar uma semente por ID
export const buscarSementePorId = async (idSemente) => {
  try {
    const response = await api.get(`/semente/${idSemente}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar semente por ID:', error);
    throw error;
  }
};

// Função para criar um cultivo
export const criarCultivo = async (cultivoData) => {
  try {
    const response = await api.post('/cultivo/criar-cultivo', cultivoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cultivo:', error);
    throw error;
  }
};

// Função para buscar um cultivo por ID
export const buscarCultivoPorId = async (idCultivo) => {
  try {
    const response = await api.get(`/cultivo/${idCultivo}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cultivo por ID:', error);
    throw error;
  }
};

// Função para editar um cultivo
export const editarCultivo = async (idCultivo, cultivoData) => {
  try {
    const response = await api.patch(`/cultivo/editar/${idCultivo}`, cultivoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar cultivo:', error);
    throw error;
  }
};

// Função para deletar um cultivo
export const deletarCultivo = async (idCultivo) => {
  try {
    const response = await api.delete(`/cultivo/deletar/${idCultivo}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar cultivo:', error);
    throw error;
  }
};

// Função para criar uma safra
export const criarSafra = async (safraData) => {
  try {
    const response = await api.post('/safra/criar-safra', safraData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar safra:', error);
    throw error;
  }
};

// Função para buscar uma safra por ID
export const buscarSafraPorId = async (idSafra) => {
  try {
    const response = await api.get(`/safra/${idSafra}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar safra por ID:', error);
    throw error;
  }
};

// Função para editar uma safra
export const editarSafra = async (idSafra, safraData) => {
  try {
    const response = await api.patch(`/safra/editar-safra/${idSafra}`, safraData);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar safra:', error);
    throw error;
  }
};

// Função para deletar uma safra
export const deletarSafra = async (idSafra) => {
  try {
    const response = await api.delete(`/safra/deletar/${idSafra}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar safra:', error);
    throw error;
  }
};

// Função para criar uma colheita
export const criarColheita = async (colheitaData) => {
  try {
    const response = await api.post('/colheita/criar-colheita', colheitaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar colheita:', error);
    throw error;
  }
};

// Função para buscar uma colheita por ID
export const buscarColheitaPorId = async (idColheita) => {
  try {
    const response = await api.get(`/colheita/${idColheita}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar colheita por ID:', error);
    throw error;
  }
};

// Função para buscar todas as colheitas
export const buscarTodasColheitas = async () => {
  try {
    const response = await api.get('/colheita');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todas as colheitas:', error);
    throw error;
  }
};

// Função para editar uma colheita
export const editarColheita = async (idColheita, colheitaData) => {
  try {
    const response = await api.patch(`/colheita/editar/${idColheita}`, colheitaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar colheita:', error);
    throw error;
  }
};

// Função para deletar uma colheita
export const deletarColheita = async (idColheita) => {
  try {
    const response = await api.delete(`/colheita/deletar/${idColheita}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar colheita:', error);
    throw error;
  }
};
