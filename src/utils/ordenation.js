export const sortByValue = (data, field) => {
  return data.sort((a, b) => a[field] - b[field]);
};

export const sortByDateBr = (data, field, ascending) => {
  return data.sort((a, b) => {
    const dateA = convertToDate(a[field]);
    const dateB = convertToDate(b[field]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

const convertToDate = (date) => {
  const [day, month, year] = date.split("/");
  return new Date(`${month}/${day}/${year}`);
};
