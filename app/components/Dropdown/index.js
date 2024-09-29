"use client";
import React from "react";

const Dropdown = ({ title, options, isOpen, toggleDropdown }) => {
  const handleOptionClick = (option) => {
    if (option.href) {
      window.location.href = option.href;
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#084739] px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#0A5A40] transition-all duration-200 active:scale-95 active:shadow-none`}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {title}
          <svg
            className="-mr-1 h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          {options.map((option, index) => (
            <a
              key={index}
              href={option.href || "#"}
              className="flex items-center block px-2 m-1 py-1 rounded-lg  text-sm text-gray-700 hover:bg-[#0A5A40] hover:text-white transition-all duration-200"
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleOptionClick(option)}
            >
              <i className={option.icon}></i> {/* Renderizando o ícone */}
              <span className="ml-2">{option.label}</span> {/* Espaço entre ícone e texto */}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
