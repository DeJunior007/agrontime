import axios from "axios";
import { decodeJWT } from "@/app/tools/decodeJWT";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
;
const apiSecretKey = "secretApiKey";

export const getJWTFromCookie = () => {
  const cookies = document.cookie.split(";");
  let jwt = null;

  cookies.forEach((cookie) => {
    if (cookie.trim().startsWith("jwt=")) {
      jwt = cookie.trim().substring(4);
    }
  });

  return jwt;
};

export const buscarUsuarioPorEmail = async () => {
  try {
    // Obtém o email do sessionStorage
    const email = sessionStorage.getItem("email");

    const response = await axios.post(
      `${apiBaseUrl}/usuarios/busca-por-email`,
      { email }, // Enviando o email salvo no sessionStorage
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar usuário: " + error.message);
  }
};

// Função para atualizar as informações do usuário
export const atualizarUsuario = async (usuario) => {
  try {
    await axios.put(
      `${apiBaseUrl}/usuarios/altera-informacoes-proprietario/${usuario.idUsuario}`,
      {
        idUsuario: usuario.idUsuario,
        nomeCompleto: usuario.nomeCompleto,
        documentoFiscal: usuario.documentoFiscal,
        email: usuario.email,
        genero: usuario.genero,
        senha: usuario.senha,
        dataNascimento: usuario.dataNascimento,
        celular: usuario.celular,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
};



export const deletarUsuario = async (usuario) => {
  try {
    await axios.delete(`${apiBaseUrl}/usuarios`, {
      data: {"id_usuario": usuario.idUsuario},
      headers: {
        "api-key": apiSecretKey,
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    throw new Error("Erro ao deletar usuário: " + error.message);
  }
};
