import axios from "axios";
import Swal from "sweetalert2";

const authLogin = async (email, senha) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = apiUrl + "/auth/login";
  const apiKey = "secretApiKey";

  try {
    const response = await axios.post(
      url,
      { email, senha },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    if (response.data && response.data.data.access_token) {
      // Salva o token no sessionStorage
      sessionStorage.setItem('jwt', response.data.data.access_token);
      window.location.href = "/home";
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível obter o token de acesso.",
      });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Não foi possível fazer login. Tente novamente mais tarde.",
    });
  }
};

export default authLogin;
