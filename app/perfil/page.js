"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input.js";
import { usuarioSchema } from "./zod";
import formConfig from "./forms.json";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { atualizarUsuario } from "../api/perfilApi";

const EditarPerfil = () => {
  const [fieldsConfig, setFieldsConfig] = useState([]);
  const [usuario, setUsuario] = useState({
    idUsuario: 1,
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

  useEffect(() => {
    setFieldsConfig(formConfig);
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
      console.log(usuarioSchema)
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
            {!Array.isArray(fieldsConfig) || !fieldsConfig.length > 0 ? (
    <div className="flex items-center justify-center w-full h-full col-span-1 md:col-span-2">
                <Loading />
              </div>
            ) : (
              fieldsConfig.map((field, index) => (
                <div key={index} className="form-group flex flex-col">
                  <div className="flex items-center ">
                    <i className={`${field.icon} text-gray-500 mr-2`}></i>
                    <Input
                       id={field.id}
                       type={field.type}
                       name={field.name}
                       label={field.label}
                       value={usuario[field.name] || ""}
                       onChange={handleChange}
                       error={errors[field.name] ? true : false}
                       options={field.options}
                       mask={field.mask}
                    />
                  </div>
                  {errors[field.name] && (
                    <p className="text-red-500 text-[12px] ml-6">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end mt-6 md:col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#084739] text-white p-3 rounded-md shadow hover:bg-[#055b4c] transition duration-200 font-semibold"
            >
              Criar Funcionário
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditarPerfil;
