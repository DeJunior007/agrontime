import React from 'react';
import InputMask from 'react-input-mask'; // Importando a biblioteca de máscara

const Input = ({ id, type = 'text', label, value, onChange, onBlur, error, name, mask, options }) => {
  return (
    <div className="relative mb-4">
      {type === 'select' ? (
        <select
          id={id}
          name={name}
          className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white border-b-4 appearance-none ${error ? 'border-[#F35746]' : 'border-[#084739]'} focus:outline-none focus:ring-0 focus:border-[#084739] peer`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="" disabled>Selecione uma opção</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="block">
          {mask ? ( // Usando InputMask se a máscara for definida
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
        </div>
      )}
      <label
        htmlFor={id}
        className={`absolute text-sm transition-all duration-300 transform top-4 z-10 origin-[0] left-2.5 ${value ? 'scale-75 -translate-y-4' : 'scale-100 translate-y-0'} ${error ? 'text-[#F35746]' : 'text-gray-500'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
