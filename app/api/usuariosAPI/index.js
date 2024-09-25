// api.js

import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = 'secretApiKey';

const axiosInstance = axios.create({
  baseURL: baseUrl + 'usuarios/funcionarios',
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
});

export const criarUsuario = async (usuario) => {
  try {
    const documentoFiscalLimpo = usuario.documentoFiscal.replace(/[^\d]/g, '');

    const dataNascimentoFormatada = new Date(usuario.dataNascimento);
    const dia = String(dataNascimentoFormatada.getDate()).padStart(2, '0');
    const mes = String(dataNascimentoFormatada.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = dataNascimentoFormatada.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const celularLimpo = usuario.celular.replace(/[^\d]/g, '');


    const usuarioFormatado = {
      ...usuario,
      documentoFiscal: documentoFiscalLimpo,
      dataNascimento: dataFormatada,
      celular: celularLimpo,
    };

    const response = await axiosInstance.post(baseUrl+ '/usuarios', usuarioFormatado);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const criarFuncionario = async (usuario) => {
  try {
    const documentoFiscalLimpo = usuario.documentoFiscal.replace(/[^\d]/g, '');

    const dataNascimentoFormatada = new Date(usuario.dataNascimento);
    const dia = String(dataNascimentoFormatada.getDate()).padStart(2, '0');
    const mes = String(dataNascimentoFormatada.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = dataNascimentoFormatada.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const celularLimpo = usuario.celular.replace(/[^\d]/g, '');

    const tipoUsuarioFormatado = usuario.tipo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const usuarioFormatado = {
      ...usuario,
      documentoFiscal: documentoFiscalLimpo,
      dataNascimento: dataFormatada,
      celular: celularLimpo,
      tipo: tipoUsuarioFormatado, 
    };

    const response = await axiosInstance.post('/usuarios/criar-funcionario', usuarioFormatado);
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
