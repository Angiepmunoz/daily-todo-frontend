
export default function CalendarDay({ calendar, index, tasksByDay }) {

  const { month,year } = calendar;
  const { cMonth, cToday } = {
    cYear: new Date().getFullYear(),
    cToday: new Date().getDate(),
    cMonth: new Date().getMonth(),
  };
  const firstDayOfMonth = calendar.firstDayOfMonth();
  const day = index - firstDayOfMonth + 1;


  if (index < firstDayOfMonth || day > calendar.numDaysInMonth()) {
    return <div className="calendar___day-div"></div>;
  } else if (month === cMonth && day === cToday) {
    return (
      <div className="calendar___day-div">
        <div className="today number">{day}</div>
        {tasksByDay[day] && tasksByDay[day].map((task,i)=> {
            return <div key={i}>{task.name}</div>
        })}
      </div>
    );
  } else {
    return (
      <div className="calendar___day-div">
        <div className="number">{day}</div>
        {tasksByDay[day] && tasksByDay[day].map((task,i)=> {
            return <div key={i}>{task.name}</div>
        })}
      </div>
    );
  }
}
