import LoginForm from "./components/LoginForm";
import LoginContent from "./components/LoginContent";
import Image from "next/image";
import logo from "/public/imgs/png/logo.png";
import PhraseYe from "./components/phraseye";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row justify-center w-full h-full lg:justify-between items-center sm:p-0 pb-10">
      <div className="absolute w-[90%] sm:w-auto flex justify-start top-0 left-0 m-4">
        <Image
          src={logo}
          alt="Logo"
          className="rounded-full w-[75px] sm:w-[100px] md:w-[125px] lg:w-[150px]"
        />
      </div>

      <div className="w-[90%] max-w-md lg:max-w-[40%] bg-transparent lg:bg-zinc-900 h-auto lg:h-screen flex flex-col justify-center items-center p-4">
        <LoginContent />
      </div>

      <div className="w-[90%] max-w-md lg:max-w-[60%] bg-[#084739] h-auto lg:h-screen flex flex-col justify-center items-center p-4">
        <LoginForm />
      </div>

      <PhraseYe />
    </main>
  );
}
