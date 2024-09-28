"use client";
import Image from "next/image";

import circle1 from "/public/imgs/svg/circle1.svg";
import circle2 from "/public/imgs/svg/circle2.svg";
import avatar from "/public/imgs/svg/login.svg";
import PhraseYe from "../phraseye";

export default function LoginContent() {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="absolute hidden sm:block bottom-0 right-0 flex flex-col justify-center items-center">
        <Image
          src={circle1}
          objectFit="contain"
          alt="Circle 1"
          width={400}
          height={400}
        />
      </div>
      <div className="absolute hidden sm:block bottom-0 right-0">
        <Image
          src={circle2}
          objectFit="contain"
          alt="Circle 2"
          width={300}
          height={300}
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
