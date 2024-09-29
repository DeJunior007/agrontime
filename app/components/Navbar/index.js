"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../../public/imgs/png/logo.png";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Dropdown from "../Dropdown";
import NavbarMobile from "./NavbarMobile"; 
import navbarData from "./navbar.json";

const Navbar = () => {
  const MySwal = withReactContent(Swal);
  const [userRole, setUserRole] = useState("master");
  const [openDropdown, setOpenDropdown] = useState(null);

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
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("jwt");
        window.location.href = "/";
      }
    });
  };

  const dropdowns = navbarData.cargos[userRole].map((category, index) => (
    <li key={index}>
      <Dropdown
        title={category.category}
        options={category.options}
        isOpen={openDropdown === index}
        toggleDropdown={() =>
          setOpenDropdown(openDropdown === index ? null : index)
        }
      />
    </li>
  ));

  return (
    <nav className="bg-[#084739] p-4 w-full flex justify-between">
      <Link href={"/home"}>
        <Image src={logo} className="rounded-full" width={35} alt="Logo" />
      </Link>
      <div>
        <ul className="hidden md:flex justify-around space-x-8 items-center">
          <li>
            <Link
              href="/perfil"
              className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#084739] px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#0A5A40] transition-all duration-200 active:scale-95 active:shadow-none`}
            >
              Meu Perfil
            </Link>
          </li>
          {dropdowns}
          <li
            className="flex justify-center items-center w-auto text-warning font-semibold hover:bg-warning hover:text-white transition-colors duration-200 cursor-pointer rounded-md p-2"
            onClick={handleLogout}
          >
            Sair
            <FaArrowRightToBracket className="ml-2" />
          </li>
        </ul>
        <NavbarMobile dropdowns={dropdowns} handleLogout={handleLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
