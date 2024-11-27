"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Input from "../components/Input.js";
import Modal from "../components/Modal";
import { useFormSubmission } from "../hooks/useFormSubmission";

const CriarFazenda = () => {
  const [formData, setFormData] = useState({
    idUsuario: "1",
    nome: "",
    nirf: "",
    areaPropriedade: "",
    endereco: {
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: ""
    }
  });
  const [errors, setErrors] = useState({});
  const { submitForm, modalState, closeModal } = useFormSubmission();

  const formFields = {
    nome: {
      type: "text",
      label: "Nome da Fazenda",
      icon: "home",
      required: true,
    },
    nirf: {
      type: "text",
      label: "NIRF",
      icon: "file-alt",
      required: true,
    },
    areaPropriedade: {
      type: "number",
      label: "Área da Propriedade (ha)",
      icon: "ruler",
      required: true,
    },
    "endereco.cep": {
      type: "text",
      label: "CEP",
      icon: "map-marker-alt",
      required: true,
      mask: "99999-999"
    },
    "endereco.rua": {
      type: "text",
      label: "Rua",
      icon: "road",
      required: true,
    },
    "endereco.numero": {
      type: "text",
      label: "Número",
      icon: "building",
      required: true,
    },
    "endereco.complemento": {
      type: "text",
      label: "Complemento",
      icon: "info-circle",
      required: false,
    },
    "endereco.bairro": {
      type: "text",
      label: "Bairro",
      icon: "map-signs",
      required: true,
    },
    "endereco.cidade": {
      type: "text",
      label: "Cidade",
      icon: "city",
      required: true,
    },
    "endereco.estado": {
      type: "text",
      label: "Estado",
      icon: "map",
      required: true,
    }
  };

  const buscarCep = async (cep) => {
    try {
      const cepLimpo = cep.replace(/\D/g, '');
      if (cepLimpo.length !== 8) return;

      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            cep: cep,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('endereco.')) {
      const enderecoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [enderecoField]: value
        }
      }));

      if (enderecoField === 'cep' && value.replace(/\D/g, '').length === 8) {
        buscarCep(value);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validação dos campos principais
    if (!formData.nome?.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }
    
    if (!formData.nirf?.trim()) {
      newErrors.nirf = "NIRF é obrigatório";
    }
    
    if (!formData.areaPropriedade) {
      newErrors.areaPropriedade = "Área da propriedade é obrigatória";
    }

    // Validação do CEP
    if (!formData.endereco?.cep?.trim()) {
      newErrors["endereco.cep"] = "CEP é obrigatório";
    } else if (!/^\d{5}-?\d{3}$/.test(formData.endereco.cep)) {
      newErrors["endereco.cep"] = "CEP inválido";
    }

    // Validação do número
    if (!formData.endereco?.numero?.trim()) {
      newErrors["endereco.numero"] = "Número é obrigatório";
    }

    // Validação do bairro
    if (!formData.endereco?.bairro?.trim()) {
      newErrors["endereco.bairro"] = "Bairro é obrigatório";
    }

    // Validação da cidade
    if (!formData.endereco?.cidade?.trim()) {
      newErrors["endereco.cidade"] = "Cidade é obrigatória";
    }

    // Validação do estado
    if (!formData.endereco?.estado?.trim()) {
      newErrors["endereco.estado"] = "Estado é obrigatório";
    }

    // Validação da rua
    if (!formData.endereco?.rua?.trim()) {
      newErrors["endereco.rua"] = "Rua é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const formattedData = {
      ...formData,
      areaPropriedade: parseFloat(formData.areaPropriedade),
    };

    const success = await submitForm(formattedData, "fazenda");
    if (success) {
      setFormData({
        idUsuario: "1",
        nome: "",
        nirf: "",
        areaPropriedade: "",
        endereco: {
          cep: "",
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: ""
        }
      });
      setErrors({});
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Nova Fazenda
          </h1>
          <p className="text-gray-600 mt-2">Preencha os dados para cadastrar uma nova fazenda</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(formFields).map(([key, field], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="form-group relative"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10">
                      <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                        <i className={`fas fa-${field.icon} text-lg text-green-600`}></i>
                      </div>
                    </div>

                    <div className="flex-1">
                      <Input
                        id={key}
                        type={field.type}
                        name={key}
                        label={field.label}
                        value={key.startsWith('endereco.') 
                          ? formData.endereco?.[key.split('.')[1]] || ""
                          : formData[key] || ""}
                        onChange={handleInputChange}
                        error={errors[key]}
                        required={field.required}
                        placeholder={`Digite ${field.label.toLowerCase()}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <motion.button
                type="button"
                onClick={() => setFormData({
                  idUsuario: "1",
                  nome: "",
                  nirf: "",
                  areaPropriedade: "",
                  endereco: {
                    cep: "",
                    rua: "",
                    numero: "",
                    complemento: "",
                    bairro: "",
                    cidade: "",
                    estado: ""
                  }
                })}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Limpar
              </motion.button>
              <motion.button
                type="submit"
                className="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-green-600 to-green-800 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Salvar Fazenda
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
};

export default CriarFazenda;
