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

export const buscarUsuarioPorEmail = async (jwt) => {
  try {
    const email = decodeJWT(jwt).email;
    const response = await axios.post(
      `${apiBaseUrl}/usuarios/busca-por-email`,
      { email },
      {
        headers: {
          "api-key": apiSecretKey,
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Erro ao buscar usuário: " + error.message);
  }
};

export const atualizarUsuario = async (usuario, jwt) => {

  // Criando uma cópia do objeto para não modificar o original
  const usuarioParaAtualizar = { ...usuario };

  // Removendo as propriedades `criadoEm` e `status`
  delete usuarioParaAtualizar.criadoEm;
  delete usuarioParaAtualizar.status;

  try {
    await axios.put(
      `${apiBaseUrl}/usuarios/altera-informacoes-proprietario/` + usuario.idUsuario,
      usuarioParaAtualizar,
      {
        headers: {
          "api-key": apiSecretKey,
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
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
