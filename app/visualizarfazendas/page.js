"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getJWTFromCookie } from "../tools/getJwtFromCookie";
import Navbar from "../components/Navbar";
import { FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { obterFazendas, deletarFazenda } from "../api/gerenciarFazendaApi";
const Fazendas = () => {
  const [fazendas, setFazendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarFazendas = async () => {
      try {
        const response = await obterFazendas(); // Use a função para obter fazendas
        setFazendas(response.data); // Atualizando fazendas com response.data
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar fazendas:", error);
        setError(error);
        Swal.fire("Erro!", "Erro ao carregar fazendas.", "error");
        setLoading(false);
      }
    };

    carregarFazendas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const jwt = getJWTFromCookie();
      await deletarFazenda(id, jwt); // Use a função de deletar fazenda
      setFazendas(fazendas.filter((fazenda) => fazenda.idFazenda !== id)); // Filtrando a fazenda deletada
      Swal.fire("Sucesso!", "Fazenda deletada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao deletar fazenda:", error);
      Swal.fire("Erro!", "Erro ao deletar fazenda.", "error");
    }
  };

  const handleManage = (id) => {
    window.location.href = `/gerenciar-fazenda/${id}`;
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center text-center p-20 text-white font-bold text-4xl">
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center text-center p-20 text-white font-bold text-4xl">
        Erro ao carregar fazendas: {error.message}
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto h-screen p-4">
        <h1 className="text-2xl font-bold text-slate-100 px-4 py-2 mb-2 rounded-lg shadow-lg bg-[#053027]">
          Lista de Fazendas
        </h1>
        <table className="min-w-full bg-white border-collapse shadow-md  overflow-hidden rounded-lg shadow-xl">
          <thead>
            <tr className="bg-slate-900 text-slate-100 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Nome da Fazenda</th>
              <th className="py-3 px-6 text-center">ID da Fazenda</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {fazendas.length > 0 ? (
              fazendas.map((fazenda, index) => (
                <tr
                  key={fazenda.idFazenda}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-200"}
                >
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {fazenda.nome}
                  </td>
                  <td className="py-3 px-6 text-center">{fazenda.idFazenda}</td>
                  <td className="py-3 px-6 text-center space-x-4 flex justify-center items-center">
                    <button
                      onClick={() => handleDelete(fazenda.idFazenda)}
                      className="text-red-500 flex items-center hover:text-red-700 font-semibold"
                    >
                      <FaTrash className="mr-1" />
                      Deletar
                    </button>
                    <button
                      onClick={() => handleManage(fazenda.idFazenda)}
                      className="text-blue-500 flex items-center hover:text-blue-700 font-semibold"
                    >
                      <FaPencil className="mr-1" />
                      Gerenciar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-6 text-center">
                  Não há fazendas disponíveis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Fazendas;
