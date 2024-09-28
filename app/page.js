import LoginForm from "./components/LoginForm";
import LoginContent from "./components/LoginContent";
import Image from "next/image";
import logo from "/public/imgs/png/logo.png";
import PhraseYe from "./components/phraseye";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-violet-900 lg:flex-row justify-center w-full h-full lg:justify-around items-center sm:p-0 pb-10 ">
      <div className="sm:absolute w-[90%] sm:w-auto flex justify-start top-0 left-0 m-4">
        <Image
          src={logo}
          alt="Logo"
          className="rounded-full w-[75px] md:w-[100px] lg:[125px]"
        />
      </div>
      <LoginContent />
      <LoginForm />
      <PhraseYe />
    </main>
  );
}
