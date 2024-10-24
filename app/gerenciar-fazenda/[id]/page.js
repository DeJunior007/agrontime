'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { fetchFarmDetails, updateFarm } from '@/app/api/gerenciarFazendaApi';
import Input from '@/app/components/Input.js';
import Loading from '@/app/components/Loading';

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
    <main>
      <Navbar />
      <section className="mx-auto p-6 bg-white h-screen flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
        Detalhes da Fazenda</h1>
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8">
            <h1 className="text-4xl font-bold text-center text-primary mb-4">
              Carregando...
            </h1>
            <Loading />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-xl w-full max-w-[50vw] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <i className="fas fa-id-card text-gray-500 mr-2"></i>
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
            <div className="flex items-center">
              <i className="fas fa-id-card text-gray-500 mr-2"></i>
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
            <div className="flex items-center">
              <i className="fas fa-chart-area text-gray-500 mr-2"></i>
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
  
            <div className="col-span-2 font-semibold text-lg">Endereço</div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
              <Input
                id="cep"
                type="text"
                label="CEP"
                value={fazenda.endereco.cep}
                onChange={handleChange}
                name="endereco.cep"
                error={errors.endereco?.cep}
              />
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
              <Input
                id="rua"
                type="text"
                label="Rua"
                value={fazenda.endereco.rua}
                onChange={handleChange}
                name="endereco.rua"
                error={errors.endereco?.rua}
              />
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
              <Input
                id="numero"
                type="text"
                label="Número"
                value={fazenda.endereco.numero}
                onChange={handleChange}
                name="endereco.numero"
                error={errors.endereco?.numero}
              />
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
              <Input
                id="complemento"
                type="text"
                label="Complemento"
                value={fazenda.endereco.complemento}
                onChange={handleChange}
                name="endereco.complemento"
                error={errors.endereco?.complemento}
              />
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
              <Input
                id="bairro"
                type="text"
                label="Bairro"
                value={fazenda.endereco.bairro}
                onChange={handleChange}
                name="endereco.bairro"
                error={errors.endereco?.bairro}
              />
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
              <Input
                id="cidade"
                type="text"
                label="Cidade"
                value={fazenda.endereco.cidade}
                onChange={handleChange}
                name="endereco.cidade"
                error={errors.endereco?.cidade}
              />
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
              <Input
                id="estado"
                type="text"
                label="Estado"
                value={fazenda.endereco.estado}
                onChange={handleChange}
                name="endereco.estado"
                error={errors.endereco?.estado}
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Atualizar
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default FarmDetailPage;
