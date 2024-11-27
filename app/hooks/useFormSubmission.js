import { useState } from 'react';
import { 
  criarSolo, 
  criarSemente, 
  criarColheita, 
  criarCultivo, 
  criarSafra 
} from '../api/culturasAPi';

export const useFormSubmission = () => {
  const [modalState, setModalState] = useState(null);

  const apiMethods = {
    solo: criarSolo,
    semente: criarSemente,
    colheita: criarColheita,
    cultivo: criarCultivo,
    safra: criarSafra,
    fazenda: async (data) => {
      const formattedData = {
        ...data,
        areaPropriedade: parseFloat(data.areaPropriedade),
        idUsuario: parseInt(data.idUsuario)
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fazendas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (response.status === 201 || response.status === 200) {
        return true;
      }
      
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar fazenda');
    }
  };

  const formatDateToISO = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  };

  const formatValue = (key, value) => {
    if (!value) return value;
    
    if (typeof value === 'string') {
      if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) return formatDateToISO(value);
      if (key.startsWith('id')) return parseInt(value, 10);
      if (['qtdSacas', 'peso', 'valorEstimado'].includes(key)) return Number(value);
    }
    
    return value;
  };

  const submitForm = async (data, type) => {
    try {
      const submitMethod = apiMethods[type];
      if (!submitMethod) {
        throw new Error(`Método não encontrado para o tipo: ${type}`);
      }

      const result = await submitMethod(data);
      
      if (result) {
        setModalState({
          title: 'Sucesso',
          message: 'Fazenda criada com sucesso!',
          type: 'success'
        });
        return true;
      }
    } catch (error) {
      setModalState({
        title: 'Erro',
        message: error.message || 'Ocorreu um erro ao processar a requisição',
        type: 'error'
      });
      return false;
    }
  };

  const closeModal = () => {
    setModalState(null);
  };

  return { submitForm, modalState, closeModal };
}; 