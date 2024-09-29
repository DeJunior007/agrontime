import { z } from "zod";

export const usuarioSchema = z.object({
  idUsuario: z.number().optional(),
  nomeCompleto: z.string().min(1, "Nome Completo é obrigatório"),
  documentoFiscal: z.string().min(1, "CPF é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  senha: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  celular: z.string().min(1, "Celular é obrigatório"),
  genero: z.string().min(1, "Gênero é obrigatório"),
  dataNascimento: z.string().min(1, "Data de Nascimento é obrigatória"),
});
