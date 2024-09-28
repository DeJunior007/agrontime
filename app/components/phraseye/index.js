"use client";
import { useEffect, useState } from "react";
import { apiYE } from "../../tools/apiYE";

export default function PhraseYe({ hideOnMobile = false }) {
  const [quote, setQuote] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    async function fetchQuote() {
      try {
        const fetchedQuote = await apiYE();
        setQuote(fetchedQuote);
      } catch (error) {
        console.error("Erro ao buscar a citação:", error);
        setQuote("Não foi possível obter uma citação no momento.");
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
    <p className={`text-white ${hideOnMobile ? 'hidden sm:block font-semibold text-4xl md:max-w-[100%]' : 'md:max-w-[80%] sm:hidden mt-10 font-light text-center'}`}>
      {greeting} {quote}
    </p>
  );
}
