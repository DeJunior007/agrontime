import LoginForm from "./components/LoginForm";
import LoginContent from "./components/LoginContent";
import Image from "next/image";
import logo from "/public/imgs/png/logo.png";
import PhraseYe from "./components/phraseye";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row justify-center w-full h-full lg:justify-between items-center p-4 lg:p-0">
      <div className="fixed lg:absolute w-full lg:w-auto flex justify-start top-0 left-0 p-4 z-10 bg-black lg:bg-transparent">
        <Image
          src={logo}
          alt="Logo"
          className="w-16 sm:w-20 md:w-24 lg:w-32 rounded-full"
        />
      </div>

      <div className="w-full mt-20 lg:mt-0 lg:w-[40%] bg-transparent lg:bg-zinc-900 min-h-[50vh] lg:h-screen flex flex-col justify-center items-center p-4 lg:p-8">
        <LoginContent />
      </div>

      <div className="w-full lg:w-[60%] bg-[#084739] min-h-[50vh] lg:h-screen flex flex-col justify-center items-center p-4 lg:p-8">
        <LoginForm />
      </div>

      <PhraseYe />
    </main>
  );
}
