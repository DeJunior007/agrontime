"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { buscarTodasColheitas } from "../api/culturasAPi"; 
import Modal from "../components/Modal";

const CriarCultura = () => {
  const [cultura, setCultura] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("solo");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabelaDados, setTabelaDados] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    await fetchData(tab); // Chama a função fetchData ao mudar a aba
  };

  const fetchData = async (tab) => {
    try {
      const response = await buscarTodasColheitas(tab); // Chama a função para buscar dados
      setTabelaDados(response.data || []); // Armazena os dados na tabela
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setModalMessage("Ocorreu um erro ao buscar os dados.");
      setIsModalOpen(true);
    }
  };

  const renderTable = () => {
    if (tabelaDados.length === 0) {
      return <p className="text-center text-gray-500">Nenhum dado disponível.</p>;
    }

    const columns = Object.keys(tabelaDados[0]);

    return (
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} className="border-b-2 border-gray-200 px-4 py-2 text-left">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabelaDados.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column} className="border-b border-gray-200 px-4 py-2">{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-[60%] mb-8">
          <h1 className="text-4xl font-bold text-center text-green-700 mb-4">Criar Cultura</h1>
          <div className="flex justify-around mb-6">
            {["solo", "semente", "colheita", "cultivo", "safra"].map((tab, index) => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`p-2 w-full relative ${activeTab === tab ? "bg-primary text-white" : "bg-white"} transition-colors duration-300 ${index === 0 ? "rounded-tl-md rounded-bl-md" : index === 4 ? "rounded-tr-md rounded-br-md" : ""}`}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`fas fa-${tab === "solo" ? "tree" : tab === "semente" ? "seedling" : tab === "colheita" ? "tractor" : tab === "cultivo" ? "leaf" : "flag"} mr-2`}></i>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-1 bg-green-600"
                  />
                )}
              </motion.button>
            ))}
          </div>
          <motion.div
            layout
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderTable()} {/* Renderiza a tabela com os dados */}
          </motion.div>
        </div>
      </main>
      {isModalOpen && <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default CriarCultura;
