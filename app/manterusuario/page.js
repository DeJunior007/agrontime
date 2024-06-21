'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import InputMask from 'react-input-mask';
import { criarUsuario } from '../api/usuariosAPI';

const usuarioSchema = z.object({
  nomeCompleto: z.string().nonempty('Nome Completo é obrigatório'),
  documentoFiscal: z.string().nonempty('CPF é obrigatório'),
  email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório'),
  senha: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_+|~=`{}\[\]:";'<>?,.\/\\-])[A-Za-z\d@$!%*#?&^_+|~=`{}\[\]:";'<>?,.\/\\-]{8,}$/, 'Senha deve conter letras maiúsculas e minúsculas, números e caracteres especiais'),
  tipo: z.enum(['Proprietário', 'Agrônomo', 'Técnico Agrícola']).optional('Tipo é obrigatório'),
  celular: z.string().nonempty('Celular é obrigatório'),
  genero: z.enum(['masculino', 'feminino', 'nao_binario']).optional('Gênero é obrigatório'),
  dataNascimento: z.string().nonempty('Data de Nascimento é obrigatória'),
});

const ManterUsuario = () => {
  const [usuario, setUsuario] = useState({
    nomeCompleto: '',
    documentoFiscal: '',
    email: '',
    senha: '',
    tipo: '',
    celular: '',
    genero: '',
    dataNascimento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      usuarioSchema.parse(usuario);
      await criarUsuario(usuario);
      Swal.fire('Sucesso!', 'Novo usuário criado com sucesso!', 'success');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(', ');
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: `Ocorreu um erro ao criar novo usuário: ${errorMessages}`,
          confirmButtonColor: '#084739',
        });
      } else {
        console.error('Erro ao criar usuário:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu um erro ao criar novo usuário.',
          confirmButtonColor: '#084739',
        });
      }
    }
  };

  const formattedJson = JSON.stringify(usuario, null, 2);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <form className="bg-white p-8 rounded shadow-md w-full max-w-4xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h1 className="text-2xl font-bold mb-6 md:col-span-2">Criar Usuário</h1>
          <div className="mb-4">
            <label className="block text-gray-700">Nome Completo</label>
            <input
              type="text"
              name="nomeCompleto"
              value={usuario.nomeCompleto}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CPF</label>
            <InputMask
              mask="999.999.999-99"
              maskChar="_"
              value={usuario.documentoFiscal}
              onChange={handleChange}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  name="documentoFiscal"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              )}
            </InputMask>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              name="senha"
              value={usuario.senha}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo</label>
            <select
              name="tipo"
              value={usuario.tipo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">Selecione...</option>
              <option value="Técnico Agrícola">Técnico Agrícola</option>
              <option value="Agrônomo">Agrônomo</option>
              <option value="Proprietário">Proprietário</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Celular</label>
            <input
              type="text"
              name="celular"
              value={usuario.celular}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gênero</label>
            <select
              name="genero"
              value={usuario.genero}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">Selecione...</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="nao_binario">Não Binário</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data de Nascimento</label>
            <InputMask
              mask="99/99/9999"
              maskChar="_"
              value={usuario.dataNascimento}
              onChange={handleChange}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  name="dataNascimento"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              )}
            </InputMask>
          </div>
          <div className="flex justify-end mt-4 md:col-span-2">
            <button
              type="button"
              onClick={handleCreateUser}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Criar Usuário
            </button>
          </div>
        </form>
        <pre className="bg-gray-200 p-4 w-full max-w-4xl overflow-auto">
          {formattedJson}
        </pre>
      </main>
    </>
  );
};

export default ManterUsuario;
