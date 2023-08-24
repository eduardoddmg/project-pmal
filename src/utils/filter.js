export const filterByValue = (array, searchObject) => {
  return array.filter((item) => {
    return Object.keys(searchObject).every((key) => {
      if (item[key]) {
        return item[key]
          .toLowerCase()
          .includes(searchObject[key].toLowerCase());
      }
      return false;
    });
  });
};
