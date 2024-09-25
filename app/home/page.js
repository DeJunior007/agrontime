"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import WelcomeMessage from "../components/WelcomeMessage";

const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15); // Arredondar para inteiro
};

export default function Home() {
  const [temperatura, setTemperatura] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");

  useEffect(() => {
    getWeatherWithGeolocation();
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

  return (
    <main className="flex min-h-screen flex-col items-center bg-white w-full">
      <Navbar />
      <section>
        <div className="flex justify-between mt-10 items-center">
          <h2 className="text-3xl font-bold text-green-700">
            Clima Atual
          </h2>
          <p className="text-2xl text-gray-800">
            Temperatura:{" "}
            {temperatura !== "" ? `${temperatura}°C` : "Carregando..."}
          </p>
        </div>
        <div className="flex justify-between mt-10 items-center">
        <p className="text-lg  text-gray-600">
          Descrição: {descricao || "Carregando..."}
        </p>
        <p className="text-lg  text-gray-600">
          Localização: {cidade}, {pais}
        </p></div>
        <p className="mt-4 italic text-gray-700 border-t border-gray-300 pt-4">
          {piadaAtual}
        </p>
      </section>
      <section className="w-full h-screen p-6 flex flex-col items-center bg-white rounded-lg shadow-lg mt-6">
        <WelcomeMessage />
      </section>
    </main>
  );
}
