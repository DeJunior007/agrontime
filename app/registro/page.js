"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { criarUsuario } from "../api/usuariosAPI";
import Swal from "sweetalert2";

const Registro = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    documentoFiscal: "",
    email: "",
    senha: "",
    celular: "",
    genero: "Masculino",
    dataNascimento: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await criarUsuario(formData);
      console.log('Resposta da API:', response);

      if (response.data && response.statusCode === 201) {
        Swal.fire({
          title: "Sucesso!",
          text: "Seu cadastro foi realizado com sucesso!",
          icon: "success",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      Swal.fire({
        title: "Erro!",
        text: error.message || "Erro ao cadastrar usuário",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex pt-20 justify-center">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-green-700 text-3xl font-bold mb-2">Criar Conta</h1>
              <p className="text-gray-600">Preencha os dados para criar sua conta</p>
            </div>
            <button
              onClick={() => window.location.href = "/"}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Voltar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome Completo */}
            <div>
              <label className="block">
                Nome Completo
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-user text-green-600"></i>
                </span>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* CPF/CNPJ e Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block">
                  CPF/CNPJ
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-id-card text-green-600"></i>
                  </span>
                  <input
                    type="text"
                    name="documentoFiscal"
                    value={formData.documentoFiscal}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block">
                  E-mail
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-envelope text-green-600"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Senha e Celular */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block">
                  Senha
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-lock text-green-600"></i>
                  </span>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block">
                  Celular
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-phone text-green-600"></i>
                  </span>
                  <input
                    type="text"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gênero e Data de Nascimento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block">
                  Gênero
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-venus-mars text-green-600"></i>
                  </span>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-green-500 appearance-none bg-white"
                    required
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block">
                  Data de Nascimento
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-calendar text-green-600"></i>
                  </span>
                  <input
                    type="text"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    placeholder="dd/mm/aaaa"
                    className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.location.href = "/"}
                className="text-green-600 px-4 py-2 rounded hover:bg-green-50 flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setFormData({
                  nomeCompleto: "",
                  documentoFiscal: "",
                  email: "",
                  senha: "",
                  celular: "",
                  genero: "Masculino",
                  dataNascimento: "",
                })}
                className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Limpar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Criar Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registro;