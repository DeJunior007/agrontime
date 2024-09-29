import z from "zod";

const removeNonNumeric = (value) => value.replace(/\D/g, "");

const idSchema = z
  .string()
  .transform((value) => {
    const numericValue = removeNonNumeric(value);
    return parseFloat(numericValue);
  })
  .refine((value) => !isNaN(value) && value > 0, {
    message: "Fazenda deve ser válida e maior que 0.",
  });

export const funcionarioSchema = z.object({
  idFazenda: idSchema,
  nomeCompleto: z.string("Nome completo é obrigatório").min(1, "Nome completo é obrigatório"),
  documentoFiscal: z.string("Documento fiscal é obrigatório").min(1, "Documento fiscal é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  tipo: z.string("Selecione um tipo").min(1, "Selecione um tipo"),
  celular: z.string("Celular é obrigatório").min(1, "Celular é obrigatório"),
  genero: z.string("Selecione um gênero").min(1, "Selecione um gênero"),
  dataNascimento: z.string("Data de nascimento é obrigatória").min(1, "Data de nascimento é obrigatória"),
});
