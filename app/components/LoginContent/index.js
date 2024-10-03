"use client";
import Image from "next/image";

import circle1 from "/public/imgs/svg/circle1.svg";
import circle2 from "/public/imgs/svg/circle2.svg";
import avatar from "/public/imgs/svg/login.svg";
import PhraseYe from "../phraseye";

export default function LoginContent() {
  return (
    <section className="flex flex-col justify-center items-center">
<div className="absolute hidden sm:flex bottom-0 right-0 flex-col justify-center items-center">
  <Image
    src={circle1}
    objectFit="contain"
    alt="Circle 1"
    className="w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[25vw]" 
    height={550}
  />
</div>
<div className="absolute hidden sm:flex bottom-0 right-0">
  <Image
    src={circle2}
    objectFit="contain"
    alt="Circle 2"
    className="w-[40vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw]"
    height={400}
  />
</div>

<div className="lg:w-[600px]"><PhraseYe hideOnMobile={true}/></div>
      <Image
        src={avatar}
        alt="avatar"
        className="max-w-[100%] lg:max-w-[600px]   "
      />
    </section>
  );
}
