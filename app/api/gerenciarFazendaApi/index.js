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
        "api-key": apiKey, // Adicione seu cabeçalho da API, se necessário
      },
    });

    // Verifique a resposta da API
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Dados enviados com sucesso!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível enviar os dados.",
      });
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Ocorreu um erro ao enviar os dados. Tente novamente mais tarde.",
    });
  }
};

export default enviarDadosFazenda;

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiSecretKey = "secretApiKey";

export const fetchFarmDetails = async (id) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/fazendas/${id}`,
      {},
      {
        headers: {
          "api-key": apiSecretKey,
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
      `${apiBaseUrl}/fazendas/${id}`,
      fazenda,
      {
        headers: {
          "api-key": apiSecretKey,
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
    const response = await axios.get(apiBaseUrl + '/fazendas');
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter fazendas:', error);
    throw error; 
  }
};

export const deletarFazenda = async (id, jwt) => {
  try {
    await axios.delete(`${apiBaseUrl}/fazendas/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar fazenda:", error);
    throw error;
  }
};