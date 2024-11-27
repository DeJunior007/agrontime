"use client";
import { useEffect, useState } from "react";
import { apiYE } from "../../tools/apiYE";

export default function PhraseYe({ hideOnMobile = false }) {
  const [quote, setQuote] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedQuote = await apiYE();
        if (!fetchedQuote) {
          throw new Error("Citação não encontrada");
        }
        setQuote(fetchedQuote);
      } catch (error) {
        console.error("Erro ao buscar a citação:", error);
        setError("Não foi possível obter uma citação no momento. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    }

    const getGreeting = () => {
      const date = new Date();
      const utcOffset = -3; 
      const localTime = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);
      const hours = localTime.getHours();

      if (hours >= 6 && hours < 12) {
        setGreeting("Bom dia,");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Boa tarde,");
      } else {
        setGreeting("Boa noite,");
      }
    };

    fetchQuote();
    getGreeting();
  }, []);

  return (
    <div className={`flex justify-center items-center ${hideOnMobile ? 'hidden sm:flex' : 'flex'}`}>
      {isLoading ? (
        <p className="text-white">Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className={`text-white ${
          hideOnMobile 
            ? 'font-semibold text-2xl lg:text-3xl text-start md:max-w-[60%] lg:max-w-[75%] xl:max-w-ful' 
            : 'mt-10 font-light text-center max-w-[80%] sm:hidden'
        }`}>
          {greeting} {quote}
        </p>
      )}
    </div>
  );
  
}
