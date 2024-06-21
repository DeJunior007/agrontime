import Image from "next/image";
import LoginForm from "./components/LoginForm";
import LoginContent from "./components/LoginContent";
import mountains from "../public/imgs/png/mountains.png";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="grid grid-cols-1 md:grid-cols-10 w-full">
        <article className="hidden md:block col-span-6 relative">
          <LoginContent />
        </article>
        <article className="col-span-1 md:col-span-4 relative">
          <LoginForm />
        </article>
      </section>
    </main>
  );
}
