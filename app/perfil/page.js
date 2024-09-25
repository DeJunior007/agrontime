"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import InputMask from "react-input-mask";
import {
  getJWTFromCookie,
  buscarUsuarioPorEmail,
  atualizarUsuario,
  deletarUsuario,
} from "../api/perfilApi";

const usuarioSchema = z.object({
  idUsuario: z.number().optional(),
  nomeCompleto: z.string().min(1, "Nome Completo é obrigatório"),
  documentoFiscal: z.string().min(1, "CPF é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  senha: z.string().min(4, "Senha deve ter no mínimo 4 caracteres"),
  tipo: z.enum(["Proprietário", "Agrônomo", "Técnico Agrícola"]),
  celular: z.string().min(1, "Celular é obrigatório"),
  genero: z.enum(["masculino", "feminino", "nao_binario"]),
  dataNascimento: z.string().min(1, "Data de Nascimento é obrigatória"),
});

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    idUsuario: "",
    nomeCompleto: "",
    documentoFiscal: "",
    email: "",
    senha: "",
    tipo: "",
    celular: "",
    genero: "",
    dataNascimento: "",
  });

  useEffect(() => {
    const jwt = getJWTFromCookie();
    if (jwt) {
      buscarUsuarioPorEmail(jwt)
        .then(setUsuario)
        .catch((error) => {
          console.error(error.message);
          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: error.message,
            confirmButtonColor: "#084739",
          });
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: name === "idUsuario" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { criadoEm, status, ...usuarioParaAtualizar } = usuario;
      usuarioSchema.parse(usuarioParaAtualizar);
      const jwt = getJWTFromCookie();
      await atualizarUsuario(usuarioParaAtualizar, jwt);
      Swal.fire(
        "Sucesso!",
        "Informações do usuário atualizadas com sucesso!",
        "success"
      );
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: error.message,
        confirmButtonColor: "#084739",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const jwt = getJWTFromCookie();
      await deletarUsuario(usuario, jwt);
      Swal.fire("Sucesso!", "Usuário deletado com sucesso!", "success");
      setUsuario({
        idUsuario: "",
        nomeCompleto: "",
        documentoFiscal: "",
        email: "",
        senha: "",
        tipo: "",
        celular: "",
        genero: "",
        dataNascimento: "",
      });
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: error.message,
        confirmButtonColor: "#084739",
      });
    }
  };

  const formattedJson = JSON.stringify(usuario, null, 2);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <form className="bg-white p-8 rounded shadow-md w-full max-w-4xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h1 className="text-2xl font-bold mb-6 md:col-span-2">
            Atualizar meu Perfil
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">ID do Usuário</label>
            <input
              type="number"
              name="idUsuario"
              value={usuario.idUsuario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nome Completo</label>
            <input
              type="text"
              name="nomeCompleto"
              value={usuario.nomeCompleto}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CPF</label>
            <InputMask
              mask="999.999.999-99"
              maskChar="_"
              value={usuario.documentoFiscal}
              onChange={(e) =>
                setUsuario({ ...usuario, documentoFiscal: e.target.value })
              }
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  name="documentoFiscal"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              )}
            </InputMask>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              name="senha"
              value={usuario.senha}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo</label>
            <select
              name="tipo"
              value={usuario.tipo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">Selecione...</option>
              <option value="Proprietário">Proprietário</option>
              <option value="Agrônomo">Agrônomo</option>
              <option value="Técnico Agrícola">Técnico Agrícola</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Celular</label>
            <input
              type="text"
              name="celular"
              value={usuario.celular}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gênero</label>
            <select
              name="genero"
              value={usuario.genero}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">Selecione...</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="nao_binario">Não Binário</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data de Nascimento</label>
            <InputMask
              mask="99/99/9999"
              maskChar="_"
              value={usuario.dataNascimento}
              onChange={(e) =>
                setUsuario({ ...usuario, dataNascimento: e.target.value })
              }
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  name="dataNascimento"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              )}
            </InputMask>
          </div>
          <div className="flex justify-end mt-4 md:col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Atualizar Informações
            </button>
            <button
              type="button"
              onClick={handleDeleteUser}
              className="bg-red-500 text-white p-2 rounded"
            >
              Deletar Usuário
            </button>
          </div>
        </form>
        <pre className="bg-gray-200 p-4 w-full max-w-4xl overflow-auto">
          {formattedJson}
        </pre>
      </main>
    </>
  );
};

export default Perfil;
