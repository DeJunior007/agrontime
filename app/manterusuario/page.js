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
import { motion } from "framer-motion";

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
      <main className="bg-gray-50 min-h-screen">
        <section className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Criar Usuário
            </h1>
            <p className="text-gray-600 mt-2">Preencha os dados para cadastrar um novo usuário</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fieldsConfig.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="form-group relative"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                          <i className={`${field.icon} text-lg text-green-600`}></i>
                        </div>
                      </div>

                      <div className="flex-1">
                        <Input
                          id={field.id}
                          type={field.type}
                          name={field.name}
                          label={field.label}
                          value={funcionario[field.name]}
                          onChange={handleChange}
                          error={errors[field.name]}
                          options={field.options}
                          mask={field.mask}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <motion.button
                  type="button"
                  onClick={() => {
                    setFuncionario({
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
                    setErrors({});
                  }}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Limpar
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-green-600 to-green-800 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Criar Usuário
                </motion.button>
              </div>
            </form>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default ManterFuncionario;
