import axios from 'axios';


export const fetchClimaApi = async (lat, long) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_WEATHER_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_WEATHER_URL;

    const response = await axios.get(`${apiUrl}?lat=${lat}&lon=${long}&appid=${apiKey}`);
    
    if (response.data.error) {
      throw new Error('Dados não encontrados');
    }

    const tempKelvin = response.data.main.temp; 
    const tempCelsius = tempKelvin - 273.15; 
    const temperaturaArredondada = Math.round(tempCelsius + 0.5); 

    return {
      temperatura: temperaturaArredondada,
      descricao: response.data.weather[0].description,
      pais: response.data.sys.country,
      nome: response.data.name,
    };
  } catch (error) {
    throw error;
  }
};


export const getWeatherWithGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        try {
          const data = await fetchClimaApi(lat, long);
          console.log('Temperatura:', data.temperatura);
        } catch (error) {
          console.error(error.message);
        }
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
  } else {
    console.error('Geolocalização não é suportada por este navegador.');
  }
};

