import "axios";

const data = {
  nomeCompleto: "Deilton Pedro",
  documentoFiscal: "000000000",
  email: "teste@gmail.com",
  senha: "Teste123!",
  celular: "00000000000",
  genero: "Masculino",
  dataNascimento: "02-04-2003",
};

post(process.env.NEXT_PUBLIC_API_URL + "/usuarios", data, {
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
