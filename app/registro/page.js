"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { criarUsuario } from "../api/usuariosAPI";
import Link from "next/link";
import Input from "../components/Input.js";
import inputFields from "./forms.json";
import { validateEmail, validatePassword, validateRequiredField } from '../utils/validate';

const ManterUsuario = () => {
  const [usuario, setUsuario] = useState({
    nomeCompleto: "",
    documentoFiscal: "",
    email: "",
    senha: "",
    celular: "",
    genero: "M",
    dataNascimento: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateUsuario = () => {
    const errors = {};

    if (!validateRequiredField(usuario.nomeCompleto)) {
      errors.nomeCompleto = "Nome Completo é obrigatório";
    }
    if (!validateRequiredField(usuario.documentoFiscal)) {
      errors.documentoFiscal = "CPF é obrigatório";
    }
    if (!validateEmail(usuario.email)) {
      errors.email = "E-mail inválido";
    }
    if (!validatePassword(usuario.senha)) {
      errors.senha = "Senha deve ter no mínimo 8 caracteres";
    }
    if (!validateRequiredField(usuario.celular)) {
      errors.celular = "Celular é obrigatório";
    }
    if (!validateRequiredField(usuario.genero)) {
      errors.genero = "Gênero é obrigatório";
    }
    if (!validateRequiredField(usuario.dataNascimento)) {
      errors.dataNascimento = "Data de Nascimento é obrigatória";
    }

    return errors;
  };

  const handleBlur = (name) => {
    const validationErrors = validateUsuario();
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name] || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateUsuario();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire("Erro de validação", Object.values(validationErrors).join("\n"), "error");
      return;
    }
  
    try {
      await criarUsuario(usuario);
      Swal.fire({
        title: "Sucesso",
        text: "Usuário cadastrado com sucesso!",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#084739",
        confirmButtonText: "Ir para Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
      setUsuario({
        nomeCompleto: "",
        documentoFiscal: "",
        email: "",
        senha: "",
        celular: "",
        genero: "M",
        dataNascimento: "",
      });
    } catch (error) {
      Swal.fire("Erro", "Erro ao cadastrar o usuário", "error");
    }
  };

  return (
    <section className="flex flex-col items-center min-h-screen p-8">
      <div className="w-full max-w-4xl mt-10 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Cadastro de Usuário
        </h1>
        <p className="text-sm md:text-lg text-gray-700 text-center mb-4">
          Preencha os campos abaixo para criar uma conta e gerenciar sua fazenda de forma eficiente.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field, index) => (
              <div key={index} className="form-group flex flex-col">
                <div className="flex items-center mb-1">
                  <i className={`${field.icon} text-gray-500 mr-2`}></i>
                  <Input
                    id={field.id}
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    value={usuario[field.name]}
                    onChange={handleChange}
                    onBlur={() => handleBlur(field.name)}
                    error={errors[field.name] ? true : false}
                    options={field.options}
                    mask={field.mask}
                  />
                </div>
                {errors[field.name] && (
                  <p className="text-red-500 text-[12px] ml-6">{errors[field.name]}</p>
                )}
              </div>
            ))}
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
