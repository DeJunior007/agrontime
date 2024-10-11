"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input.js"; // Certifique-se de que o componente Input possa lidar com selects.
import { usuarioSchema } from "./zod";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { buscarUsuarioPorEmail, atualizarUsuario } from "../api/perfilApi";

const EditarPerfil = () => {
  const [usuario, setUsuario] = useState({
    idUsuario: null,
    nomeCompleto: "",
    documentoFiscal: "",
    email: "",
    genero: "",
    senha: "",
    dataNascimento: "",
    celular: "",
  });
  const [errors, setErrors] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Sessão expirada!",
        text: "Faça login novamente.",
        confirmButtonColor: "#084739",
      });
      sessionStorage.clear();
      return; 
    }
    
    buscarUsuarioPorEmail(email)
      .then((response) => {
        const dadosUsuario = response.data; 
        setUsuario({
          idUsuario: dadosUsuario.idUsuario,
          nomeCompleto: dadosUsuario.nomeCompleto,
          documentoFiscal: dadosUsuario.documentoFiscal,
          email: dadosUsuario.email,
          genero: dadosUsuario.genero,
          senha: "", 
          dataNascimento: dadosUsuario.dataNascimento.split("/").join("/"), 
          celular: dadosUsuario.celular,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Usuário não encontrado.",
          confirmButtonColor: "#084739",
        });
        sessionStorage.clear();
      })
      .finally(() => setLoading(false));
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      usuarioSchema.parse(usuario);
      await atualizarUsuario(usuario);
      Swal.fire("Sucesso!", "Perfil atualizado com sucesso!", "success");
    } catch (error) {
      const formErrors = {};
      if (error.errors) {
        error.errors.forEach((err) => {
          formErrors[err.path[0]] = err.message;
        });
      }
      setErrors(formErrors);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Por favor, verifique os campos do formulário.",
        confirmButtonColor: "#084739",
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="flex flex-col items-center p-8">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8">
            <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
              Carregando...
            </h1>
            <Loading />
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center p-8">
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
            Editar Perfil
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Atualize suas informações de perfil.
          </p>

          <div className="flex flex-col items-center mb-4">
            <label className="block text-gray-700 mb-2">Foto de Perfil</label>
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Preview"
                className="w-32 h-32 rounded-full mb-2 object-cover shadow-lg border border-gray-300"
              />
            )}
            <div className="flex items-center flex-col space-y-4 mb-4">
              <div className="flex flex-col">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="border border-gray-300 rounded-lg p-2 bg-white hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center"
                >
                  <span className="text-gray-700">Escolher Arquivo</span>
                </label>
                {profilePicture && (
                  <span className="mt-2 text-gray-500">
                    {profilePicture.split("/").pop()}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setProfilePicture(null)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Remover Foto
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-user text-gray-500 mr-2"></i>
                <Input
                  id="nomeCompleto"
                  type="text"
                  name="nomeCompleto"
                  label="Nome Completo"
                  value={usuario.nomeCompleto}
                  onChange={handleChange}
                  error={errors.nomeCompleto ? true : false}
                />
              </div>
              {errors.nomeCompleto && (
                <p className="text-red-500 text-[12px] ml-6">
                  {errors.nomeCompleto}
                </p>
              )}
            </div>
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-file text-gray-500 mr-2"></i>
                <Input
                  id="documentoFiscal"
                  type="text"
                  name="documentoFiscal"
                  label="CPF"
                  value={usuario.documentoFiscal}
                  onChange={handleChange}
                  mask="999.999.999-99"
                  error={errors.documentoFiscal ? true : false}
                />
              </div>
              {errors.documentoFiscal && (
                <p className="text-red-500 text-[12px] ml-6">
                  {errors.documentoFiscal}
                </p>
              )}
            </div>
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-envelope text-gray-500 mr-2"></i>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  label="E-mail"
                  value={usuario.email}
                  onChange={handleChange}
                  error={errors.email ? true : false}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[12px] ml-6">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-venus-mars text-gray-500 mr-2"></i>
                <Input
                  id="genero"
                  type="select"
                  name="genero"
                  label="Gênero"
                  value={usuario.genero}
                  onChange={handleChange}
                  options={[
                    { value: "Masculino", label: "Masculino" },
                    { value: "Feminino", label: "Feminino" },
                    { value: "Outro", label: "Outro" },
                  ]}
                  error={errors.genero ? true : false}
                />
              </div>
              {errors.genero && (
                <p className="text-red-500 text-[12px] ml-6">
                  {errors.genero}
                </p>
              )}
            </div>
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-lock text-gray-500 mr-2"></i>
                <Input
                  id="senha"
                  type="password"
                  name="senha"
                  label="Senha"
                  value={usuario.senha}
                  onChange={handleChange}
                  error={errors.senha ? true : false}
                />
              </div>
              {errors.senha && (
                <p className="text-red-500 text-[12px] ml-6">
                  {errors.senha}
                </p>
              )}
            </div>
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-calendar-alt text-gray-500 mr-2"></i>
                <Input
                  id="dataNascimento"
                  type="text"
                  name="dataNascimento"
                  label="Data de Nascimento"
                  value={usuario.dataNascimento}
                  onChange={handleChange}
                  error={errors.dataNascimento ? true : false}
                />
              </div>
              {errors.dataNascimento && (
                <p className="text-red-500 text-[12px] ml-6">
                  {errors.dataNascimento}
                </p>
              )}
            </div>
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-phone text-gray-500 mr-2"></i>
                <Input
                  id="celular"
                  type="text"
                  name="celular"
                  label="Celular"
                  value={usuario.celular}
                  onChange={handleChange}
                  mask="(99) 99999-9999"
                  error={errors.celular ? true : false}
                />
              </div>
              {errors.celular && (
                <p className="text-red-500 text-[12px] ml-6">
                  {errors.celular}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#084739] text-white p-3 rounded-md shadow hover:bg-[#055b4c] transition duration-200 font-semibold"
            >
              Atualizar Perfil
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditarPerfil;
