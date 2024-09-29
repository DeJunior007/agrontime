import React, { useRef } from 'react';
import InputMask from 'react-input-mask'; // Importando a biblioteca de máscara

const Input = ({ id, type = 'text', label, value, onChange, onBlur, error, name, mask, options }) => {
  const selectRef = useRef(null);

  const handleArrowClick = () => {
    if (selectRef.current) {
      selectRef.current.focus(); // Foca no select para abrir o menu suspenso
    }
  };

  return (
    <div className="relative mb-4 w-full">
      {type === 'select' ? (
        <div className="block relative">
          <select
            id={id}
            name={name}
            ref={selectRef}
            className={`block cursor-pointer w-full h-full rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white border-b-4 appearance-none ${error ? 'border-[#F35746]' : 'border-[#084739]'} focus:outline-none focus:ring-0 focus:border-[#084739] peer`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value="" disabled hidden>
              {label}
            </option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Ícone de seta clicável */}
          <span
            className="absolute right-3 top-4 text-gray-500 "
            onClick={handleArrowClick}
            aria-hidden="true" // Para acessibilidade
          >
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </span>
          <label
            htmlFor={id}
            className={`absolute text-sm transition-all duration-300 transform top-5 z-10 origin-[0] left-2.5 
              ${value ? 'scale-75 -translate-y-4' : 'scale-100 translate-y-0'} 
              ${error ? 'text-[#F35746]' : 'text-gray-500'}`}
          >
            {label}
          </label>
        </div>
      ) : (
        <div className="block">
          {mask ? (
            <InputMask
              mask={mask}
              id={id}
              name={name}
              className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white border-b-4 appearance-none ${error ? 'border-[#F35746]' : 'border-[#084739]'} focus:outline-none focus:ring-0 focus:border-[#084739] peer`}
              placeholder=" "
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
            />
          ) : (
            <input
              type={type}
              id={id}
              name={name}
              className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white border-b-4 appearance-none ${error ? 'border-[#F35746]' : 'border-[#084739]'} focus:outline-none focus:ring-0 focus:border-[#084739] peer`}
              placeholder=" "
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
            />
          )}
          <label
            htmlFor={id}
            className={`absolute text-sm transition-all duration-300 transform top-5 z-10 origin-[0] left-2.5 
              ${value ? 'scale-75 -translate-y-4' : 'scale-100 translate-y-0'} 
              ${error ? 'text-[#F35746]' : 'text-gray-500'}`}
          >
            {label}
          </label>
        </div>
      )}
    </div>
  );
};

export default Input;
