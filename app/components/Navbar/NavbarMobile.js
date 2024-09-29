'use client';
import { useState } from "react";
import { FaArrowRightFromBracket, FaBars, FaX } from "react-icons/fa6";
import Link from "next/link";

const NavbarMobile = ({ dropdowns, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-white"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaX /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className={`absolute top-12 left-0 w-full bg-[#084739] z-50 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <ul className="flex flex-col items-center space-y-4 p-4 w-full">
            <li>
              <Link href="/perfil" className="text-white hover:underline">
                Meu Perfil
              </Link>
            </li>
            {dropdowns}
            <li 
              className="flex justify-center items-center w-auto text-orange-500 font-semibold hover:underline hover:text-red-500 cursor-pointer" 
              onClick={handleLogout}
            >
              Sair
              <FaArrowRightFromBracket className="ml-2" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
