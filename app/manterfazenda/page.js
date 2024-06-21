"use client";
import { useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../components/Navbar";

const enderecoSchema = z.object({
  cep: z.string().nonempty("CEP é obrigatório"),
  rua: z.string().nonempty("Rua é obrigatória"),
  numero: z.string().nonempty("Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().nonempty("Bairro é obrigatório"),
  cidade: z.string().nonempty("Cidade é obrigatória"),
  estado: z.string().nonempty("Estado é obrigatório"),
});

const fazendaSchema = z.object({
  idUsuario: z
    .number()
    .int()
    .positive("ID do Usuário deve ser um número inteiro positivo"),
  nome: z.string().nonempty("Nome é obrigatório"),
  nirf: z.string().nonempty("NIRF é obrigatório"),
  areaPropriedade: z
    .number()
    .int()
    .positive("Área da Propriedade deve ser um número inteiro positivo"),
  qtdFuncionarios: z
    .number()
    .int()
    .positive("Quantidade de Funcionários deve ser um número inteiro positivo"),
  endereco: enderecoSchema,
});

const ManterFazenda = () => {
  const [fazenda, setFazenda] = useState({
    idUsuario: 0,
    nome: "",
    nirf: "",
    areaPropriedade: 0,
    qtdFuncionarios: 0,
    endereco: {
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "idUsuario" ||
      name === "areaPropriedade" ||
      name === "qtdFuncionarios"
    ) {
      setFazenda((prevFazenda) => ({
        ...prevFazenda,
        [name]: parseInt(value, 10),
      }));
    } else if (name.startsWith("endereco.")) {
      const enderecoField = name.split(".")[1];
      setFazenda((prevFazenda) => ({
        ...prevFazenda,
        endereco: {
          ...prevFazenda.endereco,
          [enderecoField]: value,
        },
      }));
    } else {
      setFazenda((prevFazenda) => ({
        ...prevFazenda,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      fazendaSchema.parse(fazenda);

      // POST request para criar uma fazenda
      const response = await axios.post(
        "https://back-agrontime.onrender.com/fazendas",
        fazenda,
        {
          headers: {
            "api-key": "secretApiKey", // Substitua com sua chave de API real
          },
        }
      );
      console.log("Fazenda criada:", response.data); // Exemplo: log do resultado da criação

      // Exibe um alerta de sucesso usando Swal
      Swal.fire(
        "Sucesso!",
        "Fazenda criada com sucesso!",
        "success"
      );

    } catch (error) {
      // Trata erros de validação Zod
      if (error instanceof z.ZodError) {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: error.errors.map((err) => err.message).join(", "),
          confirmButtonColor: "#084739",
          confirmButtonText: "Confirmar",
        });
      } else {
        // Trata outros erros
        console.error("Erro ao processar:", error);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Ocorreu um erro ao processar a requisição.",
          confirmButtonColor: "#084739",
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <form className="bg-white p-8 rounded shadow-md w-full max-w-4xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h1 className="text-2xl font-bold mb-6 md:col-span-2">
            Criar Fazenda
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700">ID Usuário</label>
            <input
              type="number"
              name="idUsuario"
              value={fazenda.idUsuario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="nome"
              value={fazenda.nome}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">NIRF</label>
            <input
              type="text"
              name="nirf"
              value={fazenda.nirf}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Área da Propriedade (ha)
            </label>
            <input
              type="number"
              name="areaPropriedade"
              value={fazenda.areaPropriedade}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Quantidade de Funcionários
            </label>
            <input
              type="number"
              name="qtdFuncionarios"
              value={fazenda.qtdFuncionarios}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <h2 className="text-xl font-bold mb-4 md:col-span-2">Endereço</h2>
          <div className="mb-4">
            <label className="block text-gray-700">CEP</label>
            <input
              type="text"
              name="endereco.cep"
              value={fazenda.endereco.cep}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rua</label>
            <input
              type="text"
              name="endereco.rua"
              value={fazenda.endereco.rua}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número</label>
            <input
              type="text"
              name="endereco.numero"
              value={fazenda.endereco.numero}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Complemento</label>
            <input
              type="text"
              name="endereco.complemento"
              value={fazenda.endereco.complemento}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bairro</label>
            <input
              type="text"
              name="endereco.bairro"
              value={fazenda.endereco.bairro}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cidade</label>
            <input
              type="text"
              name="endereco.cidade"
              value={fazenda.endereco.cidade}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estado</label>
            <input
              type="text"
              name="endereco.estado"
              value={fazenda.endereco.estado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="flex justify-end mt-4 md:col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded"
            >
              Criar Fazenda
            </button>
          </div>
        </form>
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">JSON Gerado</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(fazenda, null, 2)}
          </pre>
        </div>
      </main>
    </>
  );
};

export default ManterFazenda;

