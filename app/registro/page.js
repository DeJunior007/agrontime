"use client";
import React, { useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";
import { criarUsuario } from "../api/usuariosAPI";
import Link from "next/link";

// Validação de schema com zod
const usuarioSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome Completo é obrigatório"),
  documentoFiscal: z.string().min(1, "CPF é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  senha: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_+|~=`{}\[\]:";'<>?,.\/\\-])[A-Za-z\d@$!%*#?&^_+|~=`{}\[\]:";'<>?,.\/\\-]{8,}$/,
      "Senha deve conter letras maiúsculas e minúsculas, números e caracteres especiais"
    ),
  celular: z.string().min(1, "Celular é obrigatório"),
  genero: z.enum(["masculino", "feminino", "nao_binario"], {
    required_error: "Gênero é obrigatório",
  }),
  dataNascimento: z.string().min(1, "Data de Nascimento é obrigatória"),
});

const ManterUsuario = () => {
  const [usuario, setUsuario] = useState({
    nomeCompleto: "",
    documentoFiscal: "",
    email: "",
    senha: "",
    celular: "",
    genero: "",
    dataNascimento: "",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = usuarioSchema.safeParse(usuario);

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => err.message)
        .join("\n");
      Swal.fire("Erro de validação", errorMessages, "error");
      return;
    }

    try {
      await criarUsuario(usuario);
      Swal.fire("Sucesso", "Usuário cadastrado com sucesso!", "success");
      setUsuario({
        nomeCompleto: "",
        documentoFiscal: "",
        email: "",
        senha: "",
        celular: "",
        genero: "",
        dataNascimento: "",
      });
    } catch (error) {
      Swal.fire("Erro", "Erro ao cadastrar o usuário", "error");
    }
  };

  return (
    <section className="flex flex-col items-center min-h-screen p-8">
      <div className="container mt-40 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Cadastro de Usuário
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700 font-semibold">
              Nome Completo
            </label>
            <input
              type="text"
              name="nomeCompleto"
              value={usuario.nomeCompleto}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#084739] focus:border-transparent"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold">CPF</label>
            <InputMask
              mask="999.999.999-99"
              name="documentoFiscal"
              value={usuario.documentoFiscal}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#084739] focus:border-transparent"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#084739] focus:border-transparent"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold">Senha</label>
            <input
              type="password"
              name="senha"
              value={usuario.senha}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#084739] focus:border-transparent"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold">Celular</label>
            <InputMask
              mask="(99) 99999-9999"
              name="celular"
              value={usuario.celular}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#084739] focus:border-transparent"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold">Gênero</label>
            <select
              name="genero"
              value={usuario.genero}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#084739] focus:border-transparent"
              required
            >
              <option value="">Selecione...</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="nao_binario">Não Binário</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-semibold">
              Data de Nascimento
            </label>
            <input
              type="date"
              name="dataNascimento"
              value={usuario.dataNascimento}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#084739] focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#084739] text-white font-semibold rounded-md hover:bg-[#053f33] transition duration-200"
          >
            Cadastrar
          </button>
          <Link href="/">
            <button className="w-full py-2 mt-4 text-black font-semibold rounded-md hover:bg-[#c9c9c9] transition duration-200">
              Voltar para Login
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default ManterUsuario;
