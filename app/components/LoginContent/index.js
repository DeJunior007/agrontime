'use client'; 
import Image from "next/image";
import { useEffect, useState } from 'react';
import { apiYE } from '../../tools/apiYE';
import logo from "../../../public/imgs/png/logo.png"; 
import circle1 from "../../../public/imgs/svg/circle1.svg"; 
import circle2 from "../../../public/imgs/svg/circle2.svg"; 

export default function LoginContent() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      const quote = await apiYE();
      setQuote(quote);
    }
    fetchQuote();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 m-4">
        <Image 
          src={logo} 
          width={150} 
          height={150} 
          alt="Logo"
          className='rounded-full'
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] lg:w-[50rem] lg:h-[50rem]">
        <Image 
          src={circle1} 
          layout="fill"
          objectFit="contain"
          alt="Circle 1"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] lg:w-[40rem] lg:h-[40rem]">
        <Image 
          src={circle2} 
          layout="fill"
          objectFit="contain"
          alt="Circle 2"
        />
      </div>
      {quote && (
        <div className="absolute inset-0 flex items-center justify-center text-start w-full">
          <p className="text-white text-4xl bold w-[50%]">Boa tarde,<br/><i>"{quote}"</i></p>
        </div>
      )}
    </>
  );
}
