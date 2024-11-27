"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Input from "../components/Input.js";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useFormData } from "../hooks/useFormData";
import { useFormSubmission } from "../hooks/useFormSubmission";

const CriarCultura = () => {
  // Estados
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("solo");
  const [errors, setErrors] = useState({});

  // Custom Hooks
  const { data: formsConfig, isLoading, error } = useFormData();
  const { submitForm, modalState, closeModal } = useFormSubmission();

  // Tabs disponíveis
  const tabs = [
    { 
      id: "solo", 
      icon: "layer-group", 
      label: "Solo",
      color: "from-brown-500 to-amber-700",
      description: "Cadastre informações sobre o solo"
    },
    { 
      id: "semente", 
      icon: "seedling", 
      label: "Semente",
      color: "from-green-500 to-green-700",
      description: "Registre dados das sementes"
    },
    { 
      id: "colheita", 
      icon: "tractor", 
      label: "Colheita",
      color: "from-yellow-500 to-yellow-700",
      description: "Informações sobre a colheita"
    },
    { 
      id: "cultivo", 
      icon: "leaf", 
      label: "Cultivo",
      color: "from-emerald-500 to-emerald-700",
      description: "Dados do cultivo"
    },
    { 
      id: "safra", 
      icon: "wheat-awn", 
      label: "Safra",
      color: "from-orange-500 to-orange-700",
      description: "Gestão da safra"
    }
  ];

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
  // Verifica se o campo começa com "id" e tenta converter o valor para um número
  const updatedValue = (name.startsWith("id") || name === "qtdSacas" || name === "valorEstimado") 
    ? Number(value) 
    : value;
  setFormData(prev => ({ ...prev, [name]: updatedValue }));
  setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = (fields) => {
    const newErrors = {};
    
    Object.entries(fields).forEach(([key, field]) => {
      if (field.required && !formData[key]) {
        newErrors[key] = `${field.label} é obrigatório`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const currentFields = formsConfig.dados[activeTab];
    
    if (!validateForm(currentFields)) {
      return;
    }

    const success = await submitForm(formData, activeTab);
    if (success) {
      setFormData({});
      setErrors({});
    }
  };

  // Renderização dos campos do formulário
  const renderFormFields = (fields) => {
    // Função auxiliar para obter o ícone padrão baseado no tipo do campo
    const getDefaultIcon = (fieldType) => {
      const iconMap = {
        text: "font",
        number: "hashtag",
        date: "calendar",
        select: "list",
        email: "envelope",
        password: "lock",
        tel: "phone",
        textarea: "align-left",
        // Adicione mais mapeamentos conforme necessário
      };
      return iconMap[fieldType] || "circle"; // "circle" como fallback
    };

    return (
      <div className="space-y-8">
        {/* Cabeçalho do Formulário */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className={`text-2xl font-semibold bg-gradient-to-r ${tabs.find(t => t.id === activeTab)?.color} bg-clip-text text-transparent`}>
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-gray-600 mt-1">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Campos agrupados por seção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {Object.entries(fields).map(([key, field], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="form-group relative"
            >
              <div className="flex items-start space-x-3">
                {/* Container do ícone com tamanho fixo */}
                <div className="flex-shrink-0 w-10 h-10">
                  <div className={`
                    w-full h-full rounded-full flex items-center justify-center
                    ${activeTab === 'solo' ? 'bg-brown-100' :
                      activeTab === 'semente' ? 'bg-green-100' :
                      activeTab === 'colheita' ? 'bg-yellow-100' :
                      activeTab === 'cultivo' ? 'bg-emerald-100' :
                      'bg-orange-100'}
                  `}>
                    <i className={`fas fa-${field.icon || getDefaultIcon(field.type)} text-lg
                      ${activeTab === 'solo' ? 'text-brown-500' :
                        activeTab === 'semente' ? 'text-green-500' :
                        activeTab === 'colheita' ? 'text-yellow-600' :
                        activeTab === 'cultivo' ? 'text-emerald-500' :
                        'text-orange-500'}
                    `}></i>
                  </div>
                </div>

                {/* Container do input */}
                <div className="flex-1">
                  <Input
                    id={key}
                    type={field.type}
                    name={key}
                    label={field.label}
                    value={formData[key] || ""}
                    onChange={handleInputChange}
                    error={errors[key]}
                    options={field.options}
                    mask={field.mask}
                    required={field.required}
                    placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}`}
                  />
                  {errors[key] && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors[key]}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <motion.button
            type="button"
            onClick={() => setFormData({})}
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Limpar
          </motion.button>
          <motion.button
            type="button"
            onClick={handleSubmit}
            className={`
              px-6 py-2 rounded-lg text-white font-medium
              bg-gradient-to-r ${tabs.find(t => t.id === activeTab)?.color}
              hover:shadow-lg transition-all duration-300
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Salvar {tabs.find(t => t.id === activeTab)?.label}
          </motion.button>
        </div>
      </div>
    );
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Erro ao carregar dados: {error.message}</div>;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
        <div className="w-full max-w-7xl mb-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative inline-block"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Gestão de Cultura
              </h1>
              <div className="mt-2 text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <i className="fas fa-seedling text-green-500"></i>
                  Cadastre e gerencie suas culturas agrícolas
                </span>
              </div>
            </motion.div>
          </div>

          {/* Nova estrutura de Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative p-4 rounded-lg shadow-sm
                  transition-all duration-300 ease-in-out
                  ${activeTab === tab.id 
                    ? `bg-gradient-to-r ${tab.color} text-white scale-105 shadow-lg` 
                    : 'bg-white hover:bg-gray-50'
                  }
                `}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <i className={`fas fa-${tab.icon} text-2xl`} />
                  <span className="font-medium">{tab.label}</span>
                  <span className="text-xs text-center opacity-80">
                    {tab.description}
                  </span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg border-2 border-white"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Formulário com animação */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {formsConfig?.dados[activeTab] && 
              renderFormFields(formsConfig.dados[activeTab])
            }
          </motion.div>
        </div>
      </main>
      {modalState && <Modal {...modalState} onClose={closeModal} />}
    </>
  );
};

export default CriarCultura;
