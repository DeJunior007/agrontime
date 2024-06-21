async function apiYE() {
    try {
      const response = await fetch('https://api.kanye.rest/');
      if (!response.ok) {
        throw new Error('Erro ao recuperar citação de Kanye West');
      }
      const data = await response.json();
      return data.quote; 
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  export { apiYE };
  