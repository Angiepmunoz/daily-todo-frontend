// date is off  by a date so correcting like this for now
export function formatDate(date) {
  let dateCorrection = date.split("-");
  dateCorrection[2] = Number(dateCorrection[2]) + 1;
  return new Date(`${dateCorrection.join("-")}`).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time) {
  const timeArr = time.split(":");
  return timeArr[0] > 12
    ? `${timeArr[0] - 12}:${timeArr[1]} PM`
    : `${timeArr[0]}:${timeArr[1]} AM`;
}
