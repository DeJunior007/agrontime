import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#053027] text-white py-6 border-t border-[#F35746]/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center gap-6">
          <div className="mb-4 md:mb-0 order-1 md:order-2">
            <Link href="/" className="text-xl font-bold hover:text-[#F35746] transition-colors">
              AgrOnTime
            </Link>
          </div>
          <div className="mb-4 md:mb-0 order-2 md:order-1 text-gray-300">
            <p>&copy; 2024 AgrOnTime. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-6 order-3">
            <Link href="#" className="hover:text-[#F35746] transition-colors">
              Termos de Uso
            </Link>
            <Link href="#" className="hover:text-[#F35746] transition-colors">
              Política de Privacidade
            </Link>
            <Link 
              target='_blank' 
              href="https://wa.me/5514982280039?text=Ol%C3%A1%2C+gostaria+de+saber+mais+sobre+o+AgrOnTime" 
              className="hover:text-[#F35746] transition-colors"
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
