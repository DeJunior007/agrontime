'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { fetchFarmDetails, updateFarm } from '@/app/api/gerenciarFazendaApi';
import Input from '@/app/components/Input.js';
import Loading from '@/app/components/Loading';
import { motion } from 'framer-motion';

const FarmDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [fazenda, setFazenda] = useState({
    idFazenda: null,
    idUsuario: null,
    nome: '',
    nirf: '',
    areaPropriedade: 0,
    endereco: {
      idEndereco: null,
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        setLoading(true);
        const url = window.location.href;
        const match = url.match(/\/gerenciar-fazenda\/(\d+)/);
        if (!match) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'ID não encontrado na URL',
          });
          return;
        }

        const id = match[1];
        const farmData = await fetchFarmDetails(id);

        setFazenda({
          idFazenda: farmData.idFazenda,
          idUsuario: farmData.idUsuario,
          nome: farmData.nome,
          nirf: farmData.nirf,
          areaPropriedade: farmData.areaPropriedade,
          endereco: {
            idEndereco: farmData.EnderecoFazenda?.idEndereco || null,
            cep: farmData.EnderecoFazenda?.cep || '',
            rua: farmData.EnderecoFazenda?.rua || '',
            numero: farmData.EnderecoFazenda?.numero || '',
            complemento: farmData.EnderecoFazenda?.complemento || '',
            bairro: farmData.EnderecoFazenda?.bairro || '',
            cidade: farmData.EnderecoFazenda?.cidade || '',
            estado: farmData.EnderecoFazenda?.estado || ''
          }
        });

        setValue('nome', farmData.nome);
        setValue('nirf', farmData.nirf);
        setValue('areaPropriedade', farmData.areaPropriedade);
        setValue('cep', farmData.EnderecoFazenda?.cep || '');
        setValue('rua', farmData.EnderecoFazenda?.rua || '');
        setValue('numero', farmData.EnderecoFazenda?.numero || '');
        setValue('complemento', farmData.EnderecoFazenda?.complemento || '');
        setValue('bairro', farmData.EnderecoFazenda?.bairro || '');
        setValue('cidade', farmData.EnderecoFazenda?.cidade || '');
        setValue('estado', farmData.EnderecoFazenda?.estado || '');

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar dados',
          text: error.message || 'Não foi possível carregar os dados da fazenda.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFarm();
  }, [setValue]);

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

  const onSubmit = async () => {
    try {
      const id = fazenda.idFazenda;
      delete fazenda.idFazenda;
      
      await updateFarm(id, fazenda);
      
      fazenda.idFazenda = id;
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Fazenda atualizada com sucesso!',
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao atualizar fazenda. Verifique os campos e tente novamente.',
      });
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Gerenciar Fazenda
              </h1>
              <p className="text-gray-600 mt-2">Atualize os dados da fazenda selecionada</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group relative">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                          <i className="fas fa-home text-lg text-green-600"></i>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Input
                          id="nome"
                          type="text"
                          label="Nome"
                          value={fazenda.nome}
                          onChange={handleChange}
                          name="nome"
                          error={errors.nome}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group relative">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                          <i className="fas fa-file-alt text-lg text-green-600"></i>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Input
                          id="nirf"
                          type="text"
                          label="NIRF"
                          value={fazenda.nirf}
                          onChange={handleChange}
                          name="nirf"
                          error={errors.nirf}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group relative">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                          <i className="fas fa-ruler text-lg text-green-600"></i>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Input
                          id="areaPropriedade"
                          type="number"
                          label="Área da Propriedade"
                          value={fazenda.areaPropriedade}
                          onChange={handleChange}
                          name="areaPropriedade"
                          error={errors.areaPropriedade}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Endereço</h2>
                  </div>

                  {/* Campos de endereço */}
                  {['cep', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado'].map((field) => (
                    <div key={field} className="form-group relative">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10">
                          <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                            <i className="fas fa-map-marker-alt text-lg text-green-600"></i>
                          </div>
                        </div>
                        <div className="flex-1">
                          <Input
                            id={field}
                            type="text"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={fazenda.endereco[field]}
                            onChange={handleChange}
                            name={`endereco.${field}`}
                            error={errors[`endereco.${field}`]}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <motion.button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-green-600 to-green-800 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Atualizar Fazenda
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </section>
    </main>
  );
};

export default FarmDetailPage;
