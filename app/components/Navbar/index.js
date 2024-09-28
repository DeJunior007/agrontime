'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../../public/imgs/png/logo.png";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Dropdown from "../Dropdown";
import navbarData from './navbar.json';

const Navbar = () => {
  const MySwal = withReactContent(Swal);
  const [userRole, setUserRole] = useState("master");

  useEffect(() => {
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
        sessionStorage.removeItem("jwt");
        window.location.href = "/";
      }
    });
  };

  const farmOptions = navbarData.cargos[userRole].fazenda;
  const cultureOptions = navbarData.cargos[userRole].cultura;

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
            <Dropdown title="Fazenda" options={farmOptions} />
          </li>
          <li>
            <Dropdown title="Cultura" options={cultureOptions} />
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
