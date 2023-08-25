import * as yup from "yup";

export const tco = yup
  .object()
  .shape({
    infracao_penal: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    city: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    bairro: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    n_tco: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    n_process: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    lat: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    long: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    responsavel_peticionamento: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    delegacia: yup.string("Campos inválidos").required("Esse item é obrigatório"),
  })
  .required("Campos inválidos");
