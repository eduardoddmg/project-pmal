import * as yup from "yup";

const bairros = [
  "Pontal da Barra",
  "Trapiche da Barra",
  "Prado",
  "Vergel do Lago",
  "Ponta Grossa",
  "Bom Parto",
  "Levada",
  "Centro",
  "Farol",
  "Jaraguá",
  "Poço",
  "Ponta da Terra",
  "Pajuçara",
  "Ponta Verde",
  "Jatiúca",
  "Mangabeiras",
  "Bom Parto",
  "Bebedouro",
  "Chã de Bebedouro",
  "Chã da Jaqueira",
  "Clima Bom",
  "Farol",
  "Fernão Velho",
  "Gruta de Lourdes",
  "Mutange",
  "Petrópolis",
  "Pinheiro",
  "Pintanguinha",
  "Rio Novo",
  "Santa Amélia",
  "Tabuleiro dos Martins",
  "Benedito Bentes",
  "Antares",
  "Cidade Universitária",
  "Santos Drummont",
  "Serraria",
  "Barro Duro",
  "Feitosa",
  "Jacintinho",
  "São Jorge",
  "Cruz das Almas",
  "Jacarecica",
  "Guaxuma",
  "Garça Torta",
  "Antares",
  "Tabuleiro dos Martins",
  "Santa Lucia",
  "Jardim Petropolis",
  "Canaa",
  "Ouro Preto",
  "Santo Amaro",
];

export const tco = yup
  .object()
  .shape({
    infracao_penal: yup
      .string("Campos inválidos")
      .required("Esse item é obrigatório"),
    city: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    bairro: yup.lazy((value, schema) => {
      if (schema.parent.city === "Maceió") {
        return yup.string("Campos inválidos")
          .required("Esse item é obrigatório")
          .oneOf(bairros, "Os bairros de Maceió são: Pontal da Barra, Trapiche da Barra, Prado, Vergel do Lago, Ponta Grossa, Bom Parto, Levada, Centro, Farol, Jaraguá, Poço, Ponta da Terra, Pajuçara, Ponta Verde, Jatiúca, Mangabeiras, Bom Parto, Bebedouro, Chã de Bebedouro, Chã da Jaqueira, Clima Bom, Farol, Fernão Velho, Gruta de Lourdes, Mutange, Petrópolis, Pinheiro, Pintanguinha, Rio Novo, Santa Amélia, Tabuleiro dos Martins, Benedito Bentes, Antares, Cidade Universitária, Santos Drummont, Serraria, Barro Duro, Feitosa, Jacintinho, São Jorge, Cruz das Almas, Jacarecica, Guaxuma, Garça Torta, Antares, Tabuleiro dos Martins, Santa Lucia, Jardim Petropolis, Canaa, Ouro Preto, Santo Amaro");
      }
      return yup.string("Campos inválidos").required("Esse item é obrigatório");
    }),
    n_tco: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    n_process: yup
      .string("Campos inválidos")
      .required("Esse item é obrigatório"),
    lat: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    long: yup.string("Campos inválidos").required("Esse item é obrigatório"),
    responsavel_peticionamento: yup
      .string("Campos inválidos")
      .required("Esse item é obrigatório"),
    delegacia: yup
      .string("Campos inválidos")
      .required("Esse item é obrigatório"),
  })
  .required("Campos inválidos");
