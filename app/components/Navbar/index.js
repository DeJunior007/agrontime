'use client';
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../../public/imgs/png/logo.png";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Navbar = () => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // Verifica se o token JWT existe no sessionStorage
    const checkJwtToken = () => {
      const jwtToken = sessionStorage.getItem("jwt");
      if (!jwtToken) {
        window.location.href = "/";
      }
    };
    checkJwtToken();
  }, []);

  const handleLogout = () => {
    MySwal.fire({
      title: "Você tem certeza?",
      text: "Você quer encerrar a sessão?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#084739",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, encerrar sessão!",
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Limpar o token do sessionStorage
        sessionStorage.removeItem("jwt");
        // Redirecionar para a página de login
        window.location.href = "/";
      }
    });
  };

  // Array de links da Navbar
  const links = [
    { href: "/perfil", label: "Meu Perfil" },
    { href: "/manterusuario", label: "Criar Usuário" },
    { href: "/manterfazenda", label: "Criar Fazenda" },
    { href: "/visualizarfazendas", label: "Ver Fazendas" }
  ];

  return (
    <nav className="bg-[#084739] p-4 w-full flex justify-between">
      <Link href={'/home'}>
        <Image src={logo} className="rounded-full" width={25} alt="Logo" />
      </Link>
      <div>
        <ul className="flex justify-around space-x-8">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href} className="text-white hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex justify-center items-center w-auto text-orange-500 font-semibold hover:underline hover:text-red-500 cursor-pointer" onClick={handleLogout}>
            Sair
            <FaArrowRightToBracket className="ml-2" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
