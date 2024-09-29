"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Input from "../components/Input.js";
import Loading from "../components/Loading"; // Importando o componente Loading
import { criarFuncionario } from "../api/usuariosAPI";
import formsConfig from "./forms.json";
import { funcionarioSchema } from "./zod";
import z from "zod";
import { obterFazendas } from "../api/gerenciarFazendaApi";

const ManterFuncionario = () => {
  const [funcionario, setFuncionario] = useState({
    idFazenda: "",
    nomeCompleto: "",
    documentoFiscal: "",
    email: "",
    senha: "",
    tipo: "",
    celular: "",
    genero: "",
    dataNascimento: "",
  });

  const [fazendas, setFazendas] = useState([]);
  const [errors, setErrors] = useState({});
  const [fieldsConfig, setFieldsConfig] = useState([]);

  useEffect(() => {
    const fetchFazendas = async () => {
      try {
        const { data } = await obterFazendas();
        if (data && data.length > 0) {
          setFazendas(data);
          const fazendaField = {
            id: "idFazenda",
            name: "idFazenda",
            type: "select",
            label: "Selecione uma Fazenda",
            icon: "fa fa-warehouse",
            options: data.map((fazenda) => ({
              value: fazenda.idFazenda,
              label: fazenda.nome,
            })),
          };
          setFieldsConfig([fazendaField, ...formsConfig]);
        } else {
          const result = await Swal.fire({
            title: "Nenhuma fazenda encontrada!",
            text: "Gostaria de criar uma nova fazenda?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
          });
          if (result.isConfirmed) {
            window.location.href = "/manterfazenda";
          }
        }
      } catch (error) {
        console.error("Erro ao obter fazendas:", error);
      }
    };

    fetchFazendas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuncionario((prevFuncionario) => ({
      ...prevFuncionario,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
        // Valida todos os campos de uma só vez
        funcionarioSchema.parse(funcionario);
        
        // Se a validação passar, faz a requisição
        const dadosComIdFazenda = {
            ...funcionario,
            idFazenda: funcionario.idFazenda,
        };
        console.log(dadosComIdFazenda)

        await criarFuncionario(dadosComIdFazenda);
        Swal.fire("Sucesso!", "Novo funcionário criado com sucesso!", "success");
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Acumula todos os erros de validação
            const errorMessages = error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});
            setErrors(errorMessages);
        } else {
            console.error("Erro ao criar funcionário:", error);
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "Ocorreu um erro ao criar novo funcionário.",
                confirmButtonColor: "#084739",
            });
        }
    }
};


  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8 space-y-6">
          <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
            Criar Funcionário
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Aqui, você pode criar um novo funcionário para sua fazenda.
          </p>
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
                      value={funcionario[field.name]}
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
    </>
  );
};

export default ManterFuncionario;
