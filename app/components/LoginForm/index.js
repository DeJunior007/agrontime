"use client";
import React, { useState } from "react";
import authLogin from "@/app/api/authLogin";
import Link from "next/link";
import Input from "../Input.js";
import { validateEmail, validatePassword } from "@/app/utils/validate";
import Loading from "../Loading"; // Importe o componente Loading
import forms from "./forms.json"; // Importando o forms.json

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false); // Estado para loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro ao digitar
    setFormErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleBlur = (name) => {
    if (name === "email") {
      setFormErrors((prev) => ({
        ...prev,
        email: !validateEmail(formData.email),
      }));
    } else if (name === "password") {
      setFormErrors((prev) => ({
        ...prev,
        password: !validatePassword(formData.password),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Validação
    if (!validateEmail(formData.email)) {
      setFormErrors((prev) => ({ ...prev, email: true }));
      hasError = true;
    }
    if (!validatePassword(formData.password)) {
      setFormErrors((prev) => ({ ...prev, password: true }));
      hasError = true;
    }

    if (hasError) {
      return; // Interrompe o submit se houver erro
    }

    setLoading(true); // Ativa o loading

    try {
      await authLogin(formData.email, formData.password);
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="bg-white max-w-[800px] lg:p-10 p-5 w-[90%] lg:w-full shadow-2xl rounded-2xl">
      {loading ? ( // Exibe o componente Loading se estiver carregando
        <Loading />
      ) : (
        <form className="w-full h-full" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

          {forms.map((field) => (
            <div key={field.id}>
              <Input
                id={field.id}
                type={field.type}
                label={field.label}
                name={field.id} // Adicionando name para controle de estado
                value={formData[field.id]} // Usando o valor do estado dinâmico
                onChange={handleChange}
                onBlur={() => handleBlur(field.id)} // Passando o id do campo
                error={formErrors[field.id]} // Verificando erros individuais
              />
              <br />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-10 mx-auto bg-[#084739] font-semibold text-white py-2 rounded-lg hover:bg-[#F35746] transition duration-300"
          >
            Login
          </button>

          <Link
            href="/registro"
            className="text-gray-600 mt-4 hover:text-[#F35746] block text-center"
          >
            Cadastra-se clicando aqui!
          </Link>
        </form>
      )}
    </div>
  );
}
