import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // URL da API
const apiKey = "secretApiKey"; // Substitua pela sua chave API se necessário

/**
 * Envia dados da fazenda para a API.
 * @param {Object} dadosFazenda - Dados da fazenda a serem enviados.
 * @returns {Promise<void>}
 */

const enviarDadosFazenda = async (dadosFazenda) => {
  try {
    const response = await axios.post(apiUrl + "/fazendas", dadosFazenda, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
    });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    // Verifica o status da resposta para fornecer mensagens específicas
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error("Parece que algo está errado no seu formulário. Tem certeza que seu usuário é válido?");
      } else if (status === 500) {
        throw new Error("Erro no servidor. Por favor, tente novamente mais tarde.");
      } else {
        throw new Error(error.response?.data?.message || "Erro ao enviar os dados.");
      }
    } else {
      throw new Error("Erro ao enviar os dados. Verifique sua conexão.");
    }
  }
};


export default enviarDadosFazenda;

export const fetchFarmDetails = async (id) => {
  try {
    const response = await axios.post(
      `${apiUrl}/fazendas/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error("Erro ao buscar detalhes da fazenda");
  }
};

export const fetchViaCEP = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error("CEP não encontrado");
    }

    const { logradouro, complemento, bairro, localidade, uf } = response.data;
    return {
      rua: logradouro,
      complemento,
      bairro,
      cidade: localidade,
      estado: uf,
    };
  } catch (error) {
    throw new Error(
      "CEP não encontrado. Por favor, verifique o CEP informado."
    );
  }
};

export const updateFarm = async (id, fazenda) => {
  console.log(fazenda);
  try {
    const response = await axios.patch(
      `${apiUrl}/fazendas/${id}`,
      fazenda,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const obterFazendas = async () => {
  try {
    const response = await axios.get(apiUrl + '/fazendas');
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter fazendas:', error);
    throw error; 
  }
};

export const deletarFazenda = async (id, jwt) => {
  try {
    await axios.delete(`${apiUrl}/fazendas/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar fazenda:", error);
    throw error;
  }
};

export const obterSementes = async () => {
  try {
    const response = await axios.get(apiUrl + '/semente');
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter sementes:', error);
    throw error; 
  }
};

export const obterSolos = async () => {
  try {
    const response = await axios.get(apiUrl + '/solo');
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter solos:', error);
    throw error; 
  }
};

export const obterColheitas = async () => {
  try {
    const response = await axios.get(apiUrl + '/colheita');
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter colheitas:', error);
    throw error; 
  }
};


export const obterCultivos = async () => {
  try {
    const response = await axios.get(apiUrl + '/cultivo');
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter cultivos:', error);
    throw error; 
  }
};

export const obterSafras = async () => {
  try {
    const response = await axios.get(apiUrl + '/safra');
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter safras:', error);
    throw error; 
  }
};
