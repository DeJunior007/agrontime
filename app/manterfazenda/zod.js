import { z } from "zod";

const removeNonNumeric = (value) => value.replace(/\D/g, "");

const cepSchema = z
  .string()
  .transform((value) => removeNonNumeric(value))
  .refine((value) => /^\d{8}$/.test(value), "O CEP deve conter apenas números");

const nirfSchema = z
  .string()
  .transform((value) => removeNonNumeric(value))

  .refine(
    (value) => /^\d{8}$/.test(value),
    "O NIRF deve conter apenas números"
  );
  const areaSchema = z
  .string() // Recebe como string
  .transform((value) => {
    const numericValue = removeNonNumeric(value); // Remove caracteres não numéricos
    return parseFloat(numericValue); // Converte para número
  })
  .refine((value) => !isNaN(value) && value > 0, {
    message: "A área deve ser um número maior que zero.",
  });

// Esquema de validação para o formulário
const inputSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  nirf: nirfSchema,
  areaPropriedade: areaSchema,
  cep: cepSchema,
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
});

export { inputSchema, cepSchema, areaSchema };
