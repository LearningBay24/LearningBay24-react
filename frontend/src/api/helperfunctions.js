export function cutDateStringToDate(dateString) {
  return dateString.slice(0, 10);
}

export function formatDateString(dateString) {
  // ex: "2022-07-22T18:00:05Z"
  // to: "2022-07-22, 18:00 Uhr"

  const date = dateString.slice(0, 10);
  const time = dateString.slice(11, 16);
  return " " + date + ", " + time + " Uhr";
}
