import * as yup from "yup";

export const login = yup
  .object()
  .shape({
    email: yup.string("Campos inválidos").required("Campos inválidos"),
    password: yup.string("Campos inválidos").required("Campos inválidos"),
  })
  .required("Campos inválidos");

export const register = yup
  .object()
  .shape({
    email: yup.string("Campos inválidos").required("Email é obrigatório"),
    username: yup.string("Campos inválidos").required("Username é obrigatório"),
    password: yup.string("Campos inválidos").required("Senha é obrigatório"),
  })
  .required("Campos inválidos");

export const forgot = yup
  .object()
  .shape({
    email: yup.string("Campos inválidos").required("Email é obrigatório"),
  })
  .required("Campos inválidos");
