import { firstDayOfMonth, numDaysInMonth } from "../utils/buildCalendar";

export default function CalendarDay({
  calendar,
  index,
  tasksByDay,
  setTaskModal,
}) {
  const { month, year } = calendar;
  const cYear = new Date().getFullYear();
  const cToday = new Date().getDate();
  const cMonth = new Date().getMonth();

  const fdom = firstDayOfMonth(year, month);
  const ndim = numDaysInMonth(year, month)
  const calculateDay = `${index - fdom + 1}`;
  const day = `${calculateDay}`.length === 1 ? `0${calculateDay}` : `${calculateDay}`;


  if (index < fdom || day > ndim) {
    return <div className="calendar___day-div"></div>;
  } else {
    return (
      <div className="calendar___day-div">
        <div
          className={month === cMonth && day == cToday ? "today number" : "number"}>
          {day}
        </div>
        {tasksByDay[day.length === 1 ? `0${day}` : day] &&
          tasksByDay[day.length === 1 ? `0${day}` : day].map((task, i) => {
            return (
              <div
                className="calendar___day-div___task"
                key={i}
                onClick={() => handleTaskClick(task)}
              >
                {task.name}
              </div>
            );
          })}
      </div>
    );
  }
}
