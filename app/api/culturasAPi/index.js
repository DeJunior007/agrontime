import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-agrontime.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função genérica para tratar erros
const handleApiError = (error, operacao) => {
  if (error.response) {
    // O servidor respondeu com um status de erro
    throw {
      status: error.response.status,
      message: error.response.data.message || `Erro ao ${operacao}`,
      data: error.response.data
    };
  } else if (error.request) {
    // A requisição foi feita mas não houve resposta
    throw {
      status: 503,
      message: 'Erro de conexão com o servidor',
      data: null
    };
  } else {
    // Erro na configuração da requisição
    throw {
      status: 500,
      message: error.message,
      data: null
    };
  }
};

// Função para criar um solo
export const criarSolo = async (soloData) => {
  try {
    const response = await api.post('/solo/criar-solo', soloData);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error, 'criar solo');
  }
};

// Função para criar uma semente
export const criarSemente = async (sementeData) => {
  try {
    const response = await api.post('/semente/criar', sementeData);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error, 'criar semente');
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
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error, 'criar cultivo');
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
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error, 'criar safra');
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
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error, 'criar colheita');
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
