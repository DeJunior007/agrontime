'use client'

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { fetchFarmDetails, fetchViaCEP, updateFarm } from '@/app/api/gerenciarFazendaApi';

const FarmDetailPage = () => {
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fazenda, setFazenda] = useState({
    nome: '',
    nirf: '',
    areaPropriedade: 0,
    qtdFuncionarios: 0,
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  });

  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const url = window.location.href;
        const match = url.match(/\/gerenciar-fazenda\/(\d+)/);
        if (!match) {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao buscar detalhes da fazenda',
            text: 'ID não encontrado na URL',
          });
          return;
        }
        
        const id = match[1];
        
        const farmData = await fetchFarmDetails(id);
        setFarm(farmData);

        setFazenda({
          nome: farmData.nome,
          nirf: farmData.nirf,
          areaPropriedade: farmData.areaPropriedade,
          qtdFuncionarios: farmData.qtdFuncionarios,
          endereco: {
            cep: farmData.EnderecoFazenda.cep,
            rua: farmData.EnderecoFazenda.rua,
            numero: farmData.EnderecoFazenda.numero,
            complemento: farmData.EnderecoFazenda.complemento,
            bairro: farmData.EnderecoFazenda.bairro,
            cidade: farmData.EnderecoFazenda.cidade,
            estado: farmData.EnderecoFazenda.estado
          }
        });

        setValue('nome', farmData.nome);
        setValue('nirf', farmData.nirf);
        setValue('areaPropriedade', farmData.areaPropriedade);
        setValue('qtdFuncionarios', farmData.qtdFuncionarios);
        setValue('cep', farmData.EnderecoFazenda.cep);
        setValue('rua', farmData.EnderecoFazenda.rua);
        setValue('numero', farmData.EnderecoFazenda.numero);
        setValue('complemento', farmData.EnderecoFazenda.complemento);
        setValue('bairro', farmData.EnderecoFazenda.bairro);
        setValue('cidade', farmData.EnderecoFazenda.cidade);
        setValue('estado', farmData.EnderecoFazenda.estado);

        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar detalhes da fazenda',
          text: error.message,
        });
      }
    };

    fetchFarm();
  }, [setValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "areaPropriedade" ||
      name === "qtdFuncionarios"
    ) {
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
      const url = window.location.href;
      const match = url.match(/\/gerenciar-fazenda\/(\d+)/);
      if (!match) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar fazenda',
          text: 'ID não encontrado na URL',
        });
        return;
      }
      
      const id = match[1];
      
      await updateFarm(id, fazenda);

      Swal.fire({
        icon: 'success',
        title: 'Fazenda atualizada com sucesso',
        text: 'Os dados da fazenda foram atualizados com sucesso!',
      });

      // Atualizar os detalhes da fazenda após a atualização
      const updatedFarmData = await fetchFarmDetails(id);
      setFarm(updatedFarmData);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar fazenda',
        text: 'Preencha todos os campos corretamente',
      });
    }
  };

  const fetchCepData = async (cep) => {
    try {
      const cepData = await fetchViaCEP(cep);
      setFazenda((prevFazenda) => ({
        ...prevFazenda,
        endereco: {
          ...prevFazenda.endereco,
          rua: cepData.rua,
          complemento: cepData.complemento,
          bairro: cepData.bairro,
          cidade: cepData.cidade,
          estado: cepData.estado,
        },
      }));
      setValue('rua', cepData.rua);
      setValue('complemento', cepData.complemento);
      setValue('bairro', cepData.bairro);
      setValue('cidade', cepData.cidade);
      setValue('estado', cepData.estado);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'CEP não encontrado',
        text: error.message,
      });
    }
  };

  return (
    <main>
      <Navbar />
      <section className="mx-auto block h-auto p-4">
        <h1 className="text-2xl font-bold text-slate-100 px-4 py-2 mb-2 rounded-lg shadow-lg bg-[#053027]">Detalhes da Fazenda</h1>
        {loading ? (
          <div className="text-center">Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Nome:</label>
              <input {...register('nome')} name="nome" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NIRF:</label>
              <input {...register('nirf')} name="nirf" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Área da Propriedade:</label>
              <input type="number" {...register('areaPropriedade')} name="areaPropriedade" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Quantidade de Funcionários:</label>
              <input type="number" {...register('qtdFuncionarios')} name="qtdFuncionarios" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="col-span-2 mb-4">
              <h2 className='font-semibold text-lg'>Endereço</h2>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CEP:</label>
              <input {...register('cep')} name="endereco.cep" className="w-full p-2 border border-gray-300 rounded mt-2" onBlur={(e) => fetchCepData(e.target.value)} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rua:</label>
              <input {...register('rua')} name="endereco.rua" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Número:</label>
              <input {...register('numero')} name="endereco.numero" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Complemento:</label>
              <input {...register('complemento')} name="endereco.complemento" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Bairro:</label>
              <input {...register('bairro')} name="endereco.bairro" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cidade:</label>
              <input {...register('cidade')} name="endereco.cidade" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Estado:</label>
              <input {...register('estado')} name="endereco.estado" className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Atualizar Fazenda
              </button>
            </div>
          </form>
        )}
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          {JSON.stringify(fazenda, null, 2)}
        </pre>
      </section>
    </main>
  );
};

export default FarmDetailPage;
