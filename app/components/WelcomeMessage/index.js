import Link from "next/link";

export default function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-[#f0f4f8] rounded-lg shadow-lg border border-[#d1d5db]">
      <h1 className="text-4xl font-bold text-[#084739] mb-4">
        Bem-vindo ao Sistema de Gestão de Fazendas
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Gerencie suas fazendas de forma simples e eficiente. Estamos aqui para
        ajudá-lo a maximizar seus resultados e otimizar suas operações.
      </p>
      <Link href={"/visualizarfazendas"}>
        <button className="mt-4 px-6 py-2 bg-[#084739] text-white rounded-md hover:bg-[#053f33] transition duration-200 transform hover:scale-105">
          Comece Agora
        </button>
      </Link>
    </div>
  );
}
