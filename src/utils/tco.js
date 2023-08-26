export const columns = [
  {
    Header: "Data",
    accessor: "date",
  },
  {
    Header: "Infração Penal",
    accessor: "infracao_penal",
  },
  {
    Header: "OPM",
    accessor: "responsavel_peticionamento",
  },
  {
    Header: "Cidade",
    accessor: "city",
  },
  {
    Header: "Nº TCO",
    accessor: "n_tco",
  },
];

export const funcs = {
  sum_dist: (tcoList) =>  tcoList?.reduce((total, item) => item.dist + total, 0),
  sum_time: (tcoList) => tcoList?.reduce((total, item) => item.duration + total, 0),
};


export const cards = [
  {
    color: "green",
    title: "Km economizados",
    value: (tcoList) =>  tcoList ? funcs.sum_dist(tcoList) : 0,
  },
  {
    color: "yellow",
    title: "Litros de gasolina",
    value: (tcoList) => tcoList ? funcs.sum_dist(tcoList) / 11 : 0,
  },
  {
    color: "blue",
    title: "Dinheiro economizado (R$)",
    value: (tcoList) => tcoList ? (funcs.sum_dist(tcoList) * 5) / 11 : 0,
  },
  {
    color: "purple",
    title: "Tempo economizado (minutos)",
    value: (tcoList) => tcoList ? funcs.sum_time(tcoList) : 0,
  },
];
