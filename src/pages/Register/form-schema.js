import * as yup from "yup";

export const registerFormSchema = yup.object({
  ddd: yup.string().required("Prefixo é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  name: yup.string().required("Nome completo é obrigatório"),
  password: yup.string().required("Senha é obrigatória").min(8, "Senha precisa ter no mínimo 8 caracteres"),
}).required();
