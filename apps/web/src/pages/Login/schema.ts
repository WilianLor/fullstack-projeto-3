import * as yup from "yup";

export const loginFormSchema = yup
  .object({
    username: yup
      .string()
      .max(100, "O usuário não pode conter mais do que 100 caracteres")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .max(100, "A senha não pode conter mais do que 100 caracteres")
      .required("Campo obrigatório"),
  })
  .required();
