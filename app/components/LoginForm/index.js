'use client'
import React, { useState } from 'react';
import authLogin from '@/app/api/authLogin';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authLogin(email, password);
    } catch (error) {
      console.error('Erro durante o login:', error);
      // Tratar o erro conforme necessário
    }
  };

  return (
    <div className="h-screen bg-white flex items-start justify-start p-20">
      <form className="w-full max-w h-full" onSubmit={handleSubmit}>
        <h2 className="text-4xl font-bold mb-10 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full py-2 border-b-4 border-slate-200 outline-none"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1 ">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="w-full py-2 border-b-4 border-slate-200 outline-none"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full mx-auto bg-[#084739] font-semibold text-white py-2 rounded hover:bg-[#F35746] transition duration-300"
        >
          Login
        </button>
        <Link href='/registro' className='text-slate-600 mt-4 hover:text-slate-900 block text-center'>Cadastra-se clicando aqui!</Link>
      </form>
    </div>
  );
};
