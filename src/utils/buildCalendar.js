export function numDaysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}
export function firstDayOfMonth(y, m) {
  return new Date(y, m, 1).getDay();
}
export function numOfWeeks(fdom, dim) {
  if ((fdom === 5 && dim === 31) || (fdom === 6 && dim >= 30)) return 6;
  else return 5;
}
