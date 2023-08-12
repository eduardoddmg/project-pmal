import * as yup from "yup";

export const expenses = yup.object().shape({
  title: yup.string("Campos inválidos").required("Campos inválidos"),
  value: yup
    .number("Campos inválidos")
    .required("Campos inválidos")
    .min(0, "O valor mínimo é 0")
    .max(100000, "O valor máximo é 100000"),
}).required("Campos inválidos");
