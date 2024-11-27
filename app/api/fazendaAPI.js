export const criarFazenda = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fazendas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Erro ao criar fazenda');
  }
  
  return await response.json();
}; 