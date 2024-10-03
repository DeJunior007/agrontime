import frases from "../../utils/array/frases.json";

async function apiYE() {
  try {
    // Simulando uma espera como se estivesse chamando uma API externa
    const randomIndex = Math.floor(Math.random() * frases.frases.length);
    return frases.frases[randomIndex];
  } catch (error) {
    return "que o campo responda à dedicação com uma colheita abundante.";
  }
}

export { apiYE };
