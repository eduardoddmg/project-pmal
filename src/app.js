const organograma = require("./data/organograma.json");

organograma.map(item => item.sub.map(opm => console.log(opm)))
