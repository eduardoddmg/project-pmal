export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleString("pt-BR", options); // você pode ajustar a localização e as opções conforme necessário
};

export const parseSecondsToDate = (seconds) => {
  const milliseconds = seconds * 1000; // Convert seconds to milliseconds
  const date = new Date(milliseconds);

  // Extract the day, month, and year components from the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  // Format the date as "DD/MM/YYYY"
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const parseDateToBr = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export const parseDateToEn = (date) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export const defaultDate = () => {
  const defaultDate = new Date();
  return defaultDate.toISOString().split("T")[0];
};

export const formatDateToMonthYear = (dateString) => {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const [day, month, year] = dateString.split("/");
  const monthIndex = parseInt(month) - 1;
  const monthName = months[monthIndex];

  return `${monthName} ${year}`;
}

export function calculateTravelTime(distanceKm, averageSpeedKmPerHour) {
  if (distanceKm <= 0 || averageSpeedKmPerHour <= 0) {
      return 0;
  }

  const timeInHours = distanceKm / averageSpeedKmPerHour;

  const hours = Math.floor(timeInHours);
  const minutes = Math.floor((timeInHours - hours) * 60);

  return minutes;
}