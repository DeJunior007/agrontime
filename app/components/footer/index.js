import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#053027] text-white py-2">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="mb-4 md:mb-0 order-1 md:order-2">
            <Link href="/" className="text-xl font-bold">
              AgrOnTime
            </Link>
          </div>
          <div className="mb-4 md:mb-0 order-2 md:order-1">
            <p>&copy; 2024 AgrOnTime. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-4 order-3">
            <Link href="#" className="hover:text-[#F35746]">
              Termos de Uso
            </Link>
            <Link href="#" className="hover:text-[#F35746]">
              Política de Privacidade
            </Link>
            <Link 
              target='_blank' 
              href="https://wa.me/5514982280039?text=Ol%C3%A1%2C+gostaria+de+saber+mais+sobre+o+AgrOnTime" 
              className="hover:text-[#F35746]"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
