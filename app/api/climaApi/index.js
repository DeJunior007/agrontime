  const apiKey = '5cc762c00f9f4f9abdd99343caeaba54';
  const lat = '-22.970961';
  const long = '-49.877710';

  export const fetchClimaApi = async() =>{
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);
        if(response.data.erro) {
            throw new Error('Dados não encontrados');
        }

        const {temp}=response.data.main;
        return{temperatura: temp};
    } catch (error) {
        throw new Error('Dados não encontrados, verifique a latitude e longitude')
    }
  }