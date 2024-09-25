"use client";
import { useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import enviarDadosFazenda from "../api/gerenciarFazendaApi";

const enderecoSchema = z.object({
  cep: z.string().min(1, "CEP é obrigatório"),
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
});

const fazendaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  nirf: z.string().min(1, "NIRF é obrigatório"),
  areaPropriedade: z
    .number()
    .int()
    .positive("Área da Propriedade deve ser um número inteiro positivo"),
  endereco: enderecoSchema,
});

const ManterFazenda = () => {
  const [fazenda, setFazenda] = useState({
    idUsuario: 1,
    nome: "",
    nirf: "",
    areaPropriedade: 0,
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
    if (name === "areaPropriedade") {
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
      await enviarDadosFazenda(fazenda); // Usa a função da API para enviar os dados
      Swal.fire("Sucesso!", "Fazenda criada com sucesso!", "success");
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
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8 space-y-6">
          <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
            Criar Fazenda
          </h1>
          {/** Campos do formulário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 font-medium">Nome</label>
              <input
                type="text"
                name="nome"
                value={fazenda.nome}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o nome da fazenda"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">NIRF</label>
              <input
                type="text"
                name="nirf"
                value={fazenda.nirf}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o NIRF"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">
                Área da Propriedade (ha)
              </label>
              <input
                type="number"
                name="areaPropriedade"
                value={fazenda.areaPropriedade}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Área em hectares"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mt-6">Endereço</h2>
          {/** Campos de endereço */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 font-medium">CEP</label>
              <input
                type="text"
                name="endereco.cep"
                value={fazenda.endereco.cep}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o CEP"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">Rua</label>
              <input
                type="text"
                name="endereco.rua"
                value={fazenda.endereco.rua}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o nome da rua"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">Número</label>
              <input
                type="text"
                name="endereco.numero"
                value={fazenda.endereco.numero}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o número"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">
                Complemento
              </label>
              <input
                type="text"
                name="endereco.complemento"
                value={fazenda.endereco.complemento}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o complemento (opcional)"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">Bairro</label>
              <input
                type="text"
                name="endereco.bairro"
                value={fazenda.endereco.bairro}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o bairro"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">Cidade</label>
              <input
                type="text"
                name="endereco.cidade"
                value={fazenda.endereco.cidade}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite a cidade"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium">Estado</label>
              <input
                type="text"
                name="endereco.estado"
                value={fazenda.endereco.estado}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Digite o estado"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >
              Criar Fazenda
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default ManterFazenda;
