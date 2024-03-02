export default function CalendarDay({ calendar, index }) {
  const { month } = calendar;
  const { cMonth, cToday } = {
    cYear: new Date().getFullYear(),
    cToday: new Date().getDate(),
    cMonth: new Date().getMonth(),
  };
  let firstDayOfMonth = calendar.firstDayOfMonth();
  let day = index - firstDayOfMonth + 1;
  if (index < firstDayOfMonth || day > calendar.numDaysInMonth()) {
    return <div className="calendar___day-div"></div>;
  } else if (month === cMonth && index === cToday) {
    return (
      <div className="calendar___day-div">
        <div className="today">{day}</div>
      </div>
    );
  } else {
    return (
      <div className="calendar___day-div">
        <div>{day}</div>
      </div>
    );
  }
}
