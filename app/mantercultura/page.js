"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Importando Framer Motion
import Navbar from "../components/Navbar";
import Input from "../components/Input.js/index.js";
import Loading from "../components/Loading";
import formsConfig from "./forms.json";

const CriarCultura = () => {
  const [cultura, setCultura] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("solo");

  useEffect(() => {
    setLoading(false);
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

  const handleSubmitSolo = () => {
    console.log("Conteúdo do solo:", cultura);
    alert("Ainda não está pronto");
  };

  const handleSubmitSemente = () => {
    console.log("Conteúdo da semente:", cultura);
    alert("Ainda não está pronto");
  };

  const handleSubmitColheita = () => {
    console.log("Conteúdo da colheita:", cultura);
    alert("Ainda não está pronto");
  };

  const handleSubmitCultivo = () => {
    console.log("Conteúdo do cultivo:", cultura);
    alert("Ainda não está pronto");
  };

  const handleSubmitSafra = () => {
    console.log("Conteúdo da safra:", cultura);
    alert("Ainda não está pronto");
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
                whileTap={{ scale: 0.95 }} // Animação de clique
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
            layout // Usar layout para animação suave ao mudar as abas
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
    </>
  );
};

export default CriarCultura;
