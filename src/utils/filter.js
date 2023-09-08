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

export const removeDuplicatesByField = (arr, field) => {
  const uniqueArray = arr.reduce((acc, obj) => {
    const existingObject = acc.find(item => item[field] === obj[field]);
    if (!existingObject) {
      acc.push(obj);
    }
    return acc;
  }, []);

  return uniqueArray;
};