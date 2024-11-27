const Input = ({
  id,
  type = "text",
  name,
  label,
  value,
  onChange,
  error,
  options,
  mask,
  required,
  placeholder
}) => {
  const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg
    bg-gray-50 border transition-all duration-300
    focus:outline-none focus:ring-2
    ${error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-200 focus:border-green-500 focus:ring-green-200'
    }
  `;

  return (
    <div className="form-control w-full">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'select' ? (
        <div>
          <select
            id={id}
            name={name}
            value={value || ""}
            onChange={onChange}
            className={baseInputClasses}
          >
            <option value="">Selecione uma opção</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      ) : type === 'textarea' ? (
        <>
          <textarea
            id={id}
            name={name}
            value={value || ""}
            onChange={onChange}
            className={`${baseInputClasses} min-h-[100px]`}
            placeholder={placeholder}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </>
      ) : (
        <>
          <input
            id={id}
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            className={baseInputClasses}
            placeholder={placeholder}
            required={required}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Input;