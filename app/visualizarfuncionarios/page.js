"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getJWTFromCookie } from "../tools/getJwtFromCookie";
import Navbar from "../components/Navbar";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { obterFazendas, deletarFazenda } from "../api/gerenciarFazendaApi";
import Loading from "../components/Loading";
import { motion, AnimatePresence } from "framer-motion";

const Funcionario = () => {
  const [fazendas, setFazendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const carregarFazendas = async () => {
      try {
        const response = await obterFazendas();
        setFazendas(response.data);
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
      await deletarFazenda(id, jwt);
      setFazendas(fazendas.filter((fazenda) => fazenda.idFazenda !== id));
      Swal.fire("Sucesso!", "Fazenda deletada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao deletar fazenda:", error);
      Swal.fire("Erro!", "Erro ao deletar fazenda.", "error");
    }
  };

  const handleManage = (id) => {
    window.location.href = `/gerenciar-fazenda/${id}`;
  };

  const totalPages = Math.ceil(fazendas.length / itemsPerPage);
  const currentFazendas = fazendas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex flex-col items-center p-8 bg-white">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8">
            <h1 className="text-4xl font-bold text-center text-primary mb-4">
              Carregando...
            </h1>
            <Loading />
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-screen text-gray-700 font-bold text-4xl">
        Erro ao carregar fazendas: {error.message}
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen transition-all duration-300 ease-in-out">
      <Navbar />
      <section className="mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-100 px-4 py-2 mb-4 rounded-lg shadow-lg bg-[#053027]">
          Lista de Fazendas
        </h1>
        <motion.div
          key={currentPage} // Ensures the animation runs when the page changes
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <table className="min-w-full bg-white border-collapse shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-primary text-slate-100 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Nome da Fazenda</th>
                <th className="py-3 px-6 text-center">ID da Fazenda</th>
                <th className="py-3 px-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentFazendas.length > 0 ? (
                currentFazendas.map((fazenda, index) => (
                  <tr
                    key={fazenda.idFazenda}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-slate-200"
                    } transition duration-200 hover:bg-slate-300`}
                  >
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {fazenda.nome}
                    </td>
                    <td className="py-3 px-6 text-center">{fazenda.idFazenda}</td>
                    <td className="py-3 px-6 text-center space-x-4 flex justify-center items-center">
                      <button
                        onClick={() => handleDelete(fazenda.idFazenda)}
                        className="flex items-center text-red-500 hover:text-red-700 font-semibold transition duration-200"
                      >
                        <FaTrash className="mr-1" />
                        Deletar
                      </button>
                      <button
                        onClick={() => handleManage(fazenda.idFazenda)}
                        className="flex items-center text-blue-500 hover:text-blue-700 font-semibold transition duration-200"
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
        </motion.div>
        <div className="flex justify-center mt-6">
          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 mx-1 rounded-full transition duration-300 ease-in-out ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Funcionario;
