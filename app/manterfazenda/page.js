"use client";
import { useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar/index.js";
import Input from "../components/Input.js";
import inputsConfig from "./forms.json";
import { inputSchema } from "./zod";
import enviarDadosFazenda from "../api/gerenciarFazendaApi/index.js";

const CriarFazenda = () => {
  const [errors, setErrors] = useState({});
  const [fazenda, setFazenda] = useState({
    idUsuario: 2,
    nome: "",
    nirf: "",
    areaPropriedade: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFazenda((prevFazenda) => ({
      ...prevFazenda,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    try {
      inputSchema.parse(fazenda); // Valida a fazenda inteira
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Atualiza erros com as mensagens do Zod
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          error.errors.forEach((err) => {
            newErrors[err.path.join(".")] = err.message;
          });
          return newErrors;
        });
      }
    }
  };

  const validateEndereco = () => {
    const enderecoFields = [
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ];
    let newErrors = {};

    enderecoFields.forEach((field) => {
      if (!fazenda[field]) {
        newErrors[field] = "Este campo é obrigatório.";
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    setErrors({}); // Limpa erros anteriores

    // Validação dos dados da fazenda
    const enderecoErrors = validateEndereco(); // Valida os campos de endereço

    const schemaErrors = inputSchema.safeParse(fazenda); // Valida usando Zod
    // Combine todos os erros
    const combinedErrors = { ...enderecoErrors };

    if (!schemaErrors.success) {
      schemaErrors.error.errors.forEach((err) => {
        combinedErrors[err.path.join(".")] = err.message; // Agrupa os erros pelos campos correspondentes
      });
    }

    if (Object.keys(combinedErrors).length) {
      // Se houver erros, atualiza o estado de erros e exibe mensagem
      setErrors(combinedErrors);
      const errorMessages = Object.values(combinedErrors).join("\n");
      Swal.fire({
        icon: "error",
        title: "Erro na Validação!",
        text: "Verifique os seguintes campos:\n" + errorMessages,
      });
      return; // Para a execução do submit
    }

    try {
      // Envio dos dados para a API
      let schemaErrorsData = schemaErrors.data ?? {};

      let fazendaVerificada = {
        idUsuario: fazenda?.idUsuario,
        nome: schemaErrorsData?.nome,
        nirf: schemaErrorsData?.nirf,
        areaPropriedade: schemaErrorsData?.areaPropriedade,
        endereco: {
          cep: schemaErrorsData?.cep,
          rua: schemaErrorsData?.rua,
          numero: schemaErrorsData?.numero,
          complemento: schemaErrorsData?.complemento,
          bairro: schemaErrorsData?.bairro,
          cidade: schemaErrorsData?.cidade,
          estado: schemaErrorsData?.estado,
        },
      };
      const response = await enviarDadosFazenda(fazendaVerificada);

      if (
        response &&
        (response.statusCode === 201 || response.statusCode === 200)
      ) {
        // Exibe mensagem de sucesso
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: `Fazenda criada com sucesso! ID: ${response.data.idFazenda}`,
          showCancelButton: true,
          confirmButtonText: "Ver Fazendas",
          cancelButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/visualizarfazendas"; // Redireciona para a página de visualização
          }
        });
      } else {
        // Exibe mensagem de erro se a resposta não for 200 ou 201
        Swal.fire(
          "Erro",
          response.message ||
            "Operação realizada, mas sem mensagem de sucesso.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      // Exibe mensagem de erro genérica
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text:
          error.message || "Ocorreu um erro desconhecido ao enviar os dados.",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8 space-y-6">
          <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
            Criar Fazenda
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Nesta página, você pode criar uma nova fazenda.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputsConfig.map((input) => (
              <div key={input.id} className="mb-4">
                <div className="flex items-center ">
                  <i className={`${input.icon} text-gray-500 mr-2`}></i>
                  <Input
                    id={input.id}
                    type={input.type}
                    label={input.label}
                    value={fazenda[input.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors[input.name]}
                    name={input.name}
                    options={input.options}
                    mask={input.mask}
                  />
                </div>
                {errors[input.name] && (
                  <p className="text-red-500 text-[12px] ml-6">
                    {errors[input.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6 md:col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#084739] text-white p-3 rounded-md shadow hover:bg-[#055b4c] transition duration-200 font-semibold"
            >
              Criar Fazenda
            </button>
          </div>
          {successMessage && (
            <div className="mt-4 text-green-600 text-center">
              {successMessage}
            </div>
          )}
          {showButtons && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => (window.location.href = "/visualizarfazendas")}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mr-4"
              >
                Ver Fazendas
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
              >
                OK
              </button>
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default CriarFazenda;
