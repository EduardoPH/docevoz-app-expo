import * as yup from "yup";

interface FormData {
  name: string;
  country: string;
  phone: string;
}

const editUserFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  country: yup.string().required("País é obrigatório"),
  phone: yup.string().required("Telefone é obrigatória"),
}).required();


export { FormData, editUserFormSchema };
