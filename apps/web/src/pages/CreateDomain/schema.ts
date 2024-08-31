import * as yup from "yup";

export const createDomainFormSchema = yup
  .object({
    domain: yup
      .string()
      .max(100, "O domínio não pode conter mais do que 100 caracteres")
      .test({
        test: (domain) => {
          if (domain && !domain.includes(".")) return false;

          return true;
        },
        message: "Domínio inválido",
      })
      .required("Campo obrigatório"),
  })
  .required();
