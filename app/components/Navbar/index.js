'use client'
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
    // Verifica se o cookie 'jwt' existe
    const checkJwtCookie = () => {
      const cookies = document.cookie.split("; ");
      const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));
      if (!jwtCookie) {
        window.location.href = "/";
      }
    };
    checkJwtCookie();
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
        // Limpar os cookies
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirecionar para a página de login
        window.location.href = "/";
      }
    });
  };

  return (
    <nav className="bg-[#084739] p-4 w-full flex justify-between">
      <Link href={'/home'}>
        <Image src={logo} className="rounded-full" width={25} alt="Logo" />
      </Link>
      <div>
        <ul className="flex justify-around space-x-8">
          <li>
            <Link href="/perfil" className="text-white hover:underline">
              Meu Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/manterusuario"
              className="text-white hover:underline"
            >
              Criar Usuário
            </Link>
          </li>
          <li>
            <Link
              href="/manterfazenda"
              className="text-white hover:underline"
            >
              Criar Fazenda
            </Link>
          </li>
          <li>
            <Link
              href="/visualizarfazendas"
              className="text-white hover:underline"
            >
              Ver Fazendas
            </Link>
            
          </li>
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
