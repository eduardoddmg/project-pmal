

export const funcs = {
  sum_dist: (tcoList) =>  tcoList?.reduce((total, item) => parseInt(item.dist) + total, 0),
  sum_time: (tcoList) => tcoList?.reduce((total, item) => item.duration + 240 + total, 0)/60,
};


export const cards = [
  {
    color: "orange",
    title: "TCOs lavrados",
    value: (tcoList) =>  tcoList ? tcoList.length : 0,
  },
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
    title: "Tempo economizado (horas)",
    value: (tcoList) => tcoList ? funcs.sum_time(tcoList) : 0,
  },
];
