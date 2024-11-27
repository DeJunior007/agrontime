"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getJWTFromCookie } from "../tools/getJwtFromCookie";
import Navbar from "../components/Navbar";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { obterFazendas, deletarFazenda } from "../api/gerenciarFazendaApi";
import Loading from "../components/Loading";
import { motion, AnimatePresence } from "framer-motion";

const Fazendas = () => {
  const [fazendas, setFazendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // Show confirmation dialog first
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    });

    // Only proceed with deletion if user confirmed
    if (result.isConfirmed) {
      try {
        const jwt = getJWTFromCookie();
        await deletarFazenda(id, jwt);
        setFazendas(fazendas.filter((fazenda) => fazenda.idFazenda !== id));
        Swal.fire(
          'Deletado!',
          'A fazenda foi deletada com sucesso.',
          'success'
        );
      } catch (error) {
        console.error("Erro ao deletar fazenda:", error);
        Swal.fire("Erro!", "Erro ao deletar fazenda.", "error");
      }
    }
  };

  const handleManage = (id) => {
    window.location.href = `/gerenciar-fazenda/${id}`;
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
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Lista de Fazendas
          </h1>
          <p className="text-gray-600 mt-2">Gerencie suas fazendas cadastradas</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nome da Fazenda
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                  NIRF
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                  Área (ha)
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fazendas.map((fazenda) => (
                <tr 
                  key={fazenda.idFazenda}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {fazenda.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-center">
                    {fazenda.nirf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-center">
                    {fazenda.areaPropriedade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleDelete(fazenda.idFazenda)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleManage(fazenda.idFazenda)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FaPencil />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>
    </main>
  );
};

export default Fazendas;
