import axios from "axios";

const apiBaseUrl = "https://back-agrontime.onrender.com";
const apiSecretKey = "secretApiKey";

export const fetchFarmDetails = async (id) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/fazendas/${id}`,
      {},
      {
        headers: {
          'api-key': apiSecretKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error('Erro ao buscar detalhes da fazenda');
  }
};

export const fetchViaCEP = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    const { logradouro, complemento, bairro, localidade, uf } = response.data;
    return { rua: logradouro, complemento, bairro, cidade: localidade, estado: uf };
  } catch (error) {
    throw new Error('CEP não encontrado. Por favor, verifique o CEP informado.');
  }
};

export const updateFarm = async (id, fazenda) => {
    console.log(fazenda);
  try {
    const response = await axios.patch(`${apiBaseUrl}/fazendas/${id}`, fazenda, {
      headers: {
        'api-key': apiSecretKey,
        'Content-Type': 'application/json',
      }
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
