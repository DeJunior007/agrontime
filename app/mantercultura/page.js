"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Input from "../components/Input.js";
import Loading from "../components/Loading";
import { obterJson } from "./newforms";
import { criarSolo, criarSemente, criarColheita, criarCultivo, criarSafra } from "../api/culturasAPi"; 
import Modal from "../components/Modal";

const CriarCultura = () => {
  const [cultura, setCultura] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("solo");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formsConfig, setFormsConfig] = useState(null); // Inicializando com null ou um objeto vazio

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const jsonData = await obterJson(); // Aguardando a promise ser resolvida
        console.log('Dados obtidos do formsConfig:', jsonData); // Verificando o retorno
        setFormsConfig(jsonData); // Atualizando formsConfig com os dados obtidos
      } catch (error) {
        console.error("Erro ao obter dados do formulário:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCultura((prevCultura) => ({
      ...prevCultura,
      [name]: value,
    }));
  };
  
  const renderFormFields = (fields) => {
    return Object.values(fields).map((field) => (
      <div key={field.id} className="form-group flex flex-col mb-4">
        <div className="flex items-center">
          <i className={`${field.icon} text-gray-500 mr-2`}></i>
          <Input
            id={field.id}
            type={field.type}
            name={field.id}
            label={field.label}
            value={cultura[field.id] || ""}
            onChange={handleChange}
            error={errors[field.id] ? true : false}
            options={field.options}
            mask={field.mask}
          />
        </div>
        {errors[field.id] && (
          <p className="text-red-500 text-[12px] ml-6">{errors[field.id]}</p>
        )}
      </div>
    ));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDateToISO = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  };
  
const handleSubmit = async (data, apiFunction) => {
  // Format dates, convert fields starting with "id" to integers, and convert qtdSacas to number
  const formattedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      // Check if the field is a date and format it
      typeof value === "string" && value.match(/^\d{2}\/\d{2}\/\d{4}$/)
        ? formatDateToISO(value)
        // Check if the key starts with "id" and convert to integer
        : key.startsWith("id") && typeof value === "string"
        ? parseInt(value, 10)
        // Convert qtdSacas to a number
        : key === "qtdSacas" && typeof value === "string"
        ? Number(value)

        : key === "peso" && typeof value === "string"
        ? Number(value)

        : key === "valorEstimado" && typeof value === "string"
        ? Number(value)
        : value,
        
    ])
  );

    try {
      const response = await apiFunction(formattedData);
      console.log("Resposta da API:", response);
      const { statusCode, message } = response.data || {};
  
      if (statusCode !== 200 && statusCode !== 201) {
        console.log("Erro no statusCode:", statusCode);
        setModalMessage({
          message: message || "Ocorreu um erro ao adicionar a entidade.",
          entity: "",
          isError: true,
        });
      } else {
        console.log("Operação bem-sucedida:", response.data);
        setModalMessage({
          message: message || "Operação realizada com sucesso.",
          entity: response.data.nome || "Entidade",
          isError: false,
        });
      }
  
      setIsModalOpen(true);
    } catch (error) {
      alert("Erro de rede");
    }
  };
  
  
  

  const handleSubmitSolo = () => {
    const soloData = Object.keys(formsConfig.dados.solo).reduce((acc, key) => {
      if (key in cultura) {
        acc[key] = cultura[key];
      }
      return acc;
    }, {});
    handleSubmit(soloData, criarSolo);
  };

  const handleSubmitSemente = () => {
    const sementeData = Object.keys(formsConfig.dados.semente).reduce((acc, key) => {
      if (key in cultura) {
        acc[key] = cultura[key];
      }
      return acc;
    }, {});
    handleSubmit(sementeData, criarSemente);
  };

  const handleSubmitColheita = () => {
    const colheitaData = Object.keys(formsConfig.dados.colheita).reduce((acc, key) => {
      if (key in cultura) {
        acc[key] = cultura[key];
      }
      return acc;
    }, {});
    handleSubmit(colheitaData, criarColheita);
  };

  const handleSubmitCultivo = () => {
    const cultivoData = Object.keys(formsConfig.dados.cultivo).reduce((acc, key) => {
      if (key in cultura) {
        acc[key] = cultura[key];
      }
      return acc;
    }, {});
    handleSubmit(cultivoData, criarCultivo);
  };

  const handleSubmitSafra = () => {
    const safraData = Object.keys(formsConfig.dados.safra).reduce((acc, key) => {
      if (key in cultura) {
        acc[key] = cultura[key];
      }
      return acc;
    }, {});
    handleSubmit(safraData, criarSafra);
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
            <form className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === "solo" && renderFormFields(formsConfig.dados.solo)}
                {activeTab === "semente" && renderFormFields(formsConfig.dados.semente)}
                {activeTab === "colheita" && renderFormFields(formsConfig.dados.colheita)}
                {activeTab === "cultivo" && renderFormFields(formsConfig.dados.cultivo)}
                {activeTab === "safra" && renderFormFields(formsConfig.dados.safra)}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={
                    activeTab === "solo" ? handleSubmitSolo :
                    activeTab === "semente" ? handleSubmitSemente :
                    activeTab === "colheita" ? handleSubmitColheita :
                    activeTab === "cultivo" ? handleSubmitCultivo :
                    handleSubmitSafra
                  }
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Enviar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      {isModalOpen && <Modal message={modalMessage.message} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default CriarCultura;
