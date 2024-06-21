import Navbar from "../components/Navbar";
import WelcomeMessage from "../components/WelcomeMessage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 w-full">
      <Navbar />
      <section className="w-full p-4 flex flex-col items-center">
        <WelcomeMessage />
      </section>
    </main>
  );
}
