"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import WelcomeMessage from "../components/WelcomeMessage";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie } from 'recharts';
import { ResponsiveContainer } from 'recharts';

const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15); // Arredondar para inteiro
};

// Helper function para contar safras ativas
const contarSafrasAtivas = (safras) => {
  if (!Array.isArray(safras)) return 0;
  return safras.filter(safra => safra?.status === 'Ativo').length;
};

// Função helper para formatar data
const formatarData = (dataString) => {
  if (!dataString) return 'N/A';
  const data = new Date(dataString.replace(' ', 'T')); // Converte para formato ISO
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export default function Home() {
  const [temperatura, setTemperatura] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [cultivos, setCultivos] = useState([]);
  const [colheitas, setColheitas] = useState([]);
  const [safras, setSafras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWeatherWithGeolocation();
    fetchDashboardData();
  }, []);

  const fetchClimaApi = async (lat, long) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_WEATHER_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_API_WEATHER_URL;

      const response = await axios.get(
        `${apiUrl}?lat=${lat}&lon=${long}&appid=${apiKey}`
      );

      if (response.data.error) {
        throw new Error("Dados não encontrados");
      }

      const { temp } = response.data.main;
      const weatherData = response.data.weather[0];

      // Definindo os estados
      setTemperatura(kelvinToCelsius(temp));
      setDescricao(weatherData.description);
      setCidade(response.data.name);
      setPais(response.data.sys.country);
    } catch (error) {
      console.error("Erro ao buscar dados de clima:", error.message);
    }
  };

  const getWeatherWithGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchClimaApi(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada por este navegador.");
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };

      const [cultivosRes, colheitasRes, safrasRes] = await Promise.all([
        axios.get('https://back-agrontime.up.railway.app/cultivo', config),
        axios.get('https://back-agrontime.up.railway.app/colheita', config),
        axios.get('https://back-agrontime.up.railway.app/safra', config)
      ]);

      // Acessando o array data dentro do objeto response
      setCultivos(cultivosRes.data?.data || []);
      setColheitas(colheitasRes.data?.data || []);
      setSafras(safrasRes.data?.data || []);

      // Verificar se a operação foi bem sucedida
      if (cultivosRes.data.statusCode !== 200 || 
          colheitasRes.data.statusCode !== 200 || 
          safrasRes.data.statusCode !== 200) {
        throw new Error("Erro ao buscar dados");
      }

    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
      setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      setCultivos([]);
      setColheitas([]);
      setSafras([]);
    } finally {
      setLoading(false);
    }
  };

  const piadas = {
    "clear sky":
      "Céu limpo? Ótimo para aquele churrasco depois do trabalho! O que o sol disse para a nuvem? 'Saia da minha sombra!'",
    "few clouds":
      "Poucas nuvens? Perfeito para um passeio! Você sabe por que a nuvem não é boa em segredos? Porque sempre acaba 'nublando' tudo!",
    "scattered clouds":
      "Nuvens dispersas? Um ótimo dia para relaxar! O que uma nuvem disse para a outra? 'Vamos flutuar para longe!'",
    "broken clouds":
      "Nuvens fragmentadas? Cuidado, pode chover! O que as nuvens fazem quando têm uma má notícia? Elas se tornam 'nuvens de tempestade'!",
    "shower rain":
      "Chuva leve? Um bom dia para um filme! O que o guarda-chuva disse para a chuva? 'Vamos ficar juntos!'",
    rain: "Chuva? Hora de ficar em casa com um chocolate quente! O que a chuva disse ao solo? 'Você é tão atraente!'",
    thunderstorm:
      "Tempestade? Melhor ficar em casa! Por que os trovões são tão bons em esportes? Porque eles têm um ótimo 'soco'!",
    snow: "Neve? Perfeito para um chocolate quente! O que disse a neve quando chegou? 'Estou aqui para esfriar as coisas!'",
    mist: "Neblina? Um dia misterioso! Por que a neblina nunca se sente sozinha? Porque ela sempre tem 'companheiros' de sombra!",
  };

  const piadaAtual = piadas[descricao] || "Aguardando a previsão do tempo...";

  // Componente de loading
  const LoadingCard = () => (
    <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md">
      <div className="animate-pulse text-gray-500">Carregando...</div>
    </div>
  );

  // Componente de erro
  const ErrorCard = ({ message }) => (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
      <p className="text-red-600">{message}</p>
      <button 
        onClick={fetchDashboardData}
        className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
      >
        Tentar novamente
      </button>
    </div>
  );

  // Componente para quando não há dados
  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl">
      <p className="text-gray-500">{message}</p>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      {/* Dashboard Header */}
      <div className="w-full px-6 py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Agrícola</h1>
              <p className="text-gray-500">Visão geral das suas operações</p>
            </div>
            
            {/* Weather Card */}
            <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-auto">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Temperatura Atual</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {temperatura !== "" ? `${temperatura}°C` : "Carregando..."}
                  </p>
                </div>
                <div className="border-l pl-4">
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="text-gray-700">{cidade}, {pais}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 italic">{piadaAtual}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {error ? (
          <ErrorCard message={error} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Card de Cultivos */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm">Detalhes do Cultivo</h3>
                <p className="text-2xl font-bold text-gray-900">{cultivos[0]?.nome || 'N/A'}</p>
                <p className="text-sm text-gray-500">Área: {cultivos[0]?.areaTotal || 0} ha</p>
                <p className="text-sm text-gray-500">Data Plantio: {cultivos[0]?.dataPlantio ? formatarData(cultivos[0].dataPlantio) : 'N/A'}</p>
              </div>

              {/* Card de Colheita */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm">Última Colheita</h3>
                <p className="text-2xl font-bold text-gray-900">{colheitas[0]?.qtdSacas || 0} sacas</p>
                <p className="text-sm text-gray-500">Peso: {colheitas[0]?.peso || 0} kg</p>
                <p className="text-sm text-gray-500">Valor: R$ {colheitas[0]?.valorEstimado || 0}</p>
                <p className="text-sm text-gray-500">Qualidade: {colheitas[0]?.qualidade || 'N/A'}</p>
              </div>

              {/* Card de Safra */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm">Status da Safra</h3>
                <p className="text-2xl font-bold text-gray-900">{safras[0]?.status || 'N/A'}</p>
                <p className="text-sm text-gray-500">
                  Período: {safras[0]?.dataInicio ? formatarData(safras[0].dataInicio) : 'N/A'} - 
                  {safras[0]?.dataFim ? formatarData(safras[0].dataFim) : 'N/A'}
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Gráfico de Colheita */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Detalhes da Colheita</h3>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={colheitas}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="dataColheita" 
                        tickFormatter={(date) => formatarData(date)}
                      />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === 'qtdSacas') return [`${value} sacas`, 'Quantidade'];
                          if (name === 'valorEstimado') return [`R$ ${value}`, 'Valor'];
                          if (name === 'peso') return [`${value} kg`, 'Peso'];
                          return [value, name];
                        }}
                      />
                      <Bar yAxisId="left" dataKey="qtdSacas" fill="#8884d8" name="Quantidade de Sacas" />
                      <Bar yAxisId="right" dataKey="valorEstimado" fill="#82ca9d" name="Valor Estimado" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Informações do Cultivo */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Informações do Cultivo</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nome:</span>
                    <span className="font-semibold">{cultivos[0]?.nome}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Área Total:</span>
                    <span className="font-semibold">{cultivos[0]?.areaTotal} ha</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Data de Plantio:</span>
                    <span className="font-semibold">{formatarData(cultivos[0]?.dataPlantio)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela de Resumo */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Resumo Geral</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Área</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Data Plantio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cultivos.map((cultivo) => (
                      <tr key={cultivo.idCultivo}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {cultivo.idCultivo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {cultivo.nome}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {cultivo.areaTotal} ha
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatarData(cultivo.dataPlantio)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
