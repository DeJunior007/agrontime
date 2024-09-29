const fetchAddressFromCEP = async (cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) throw new Error("Erro ao buscar o endereço");
    return await response.json();
  };
  
  export { fetchAddressFromCEP };
  