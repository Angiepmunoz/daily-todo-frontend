import "../styles/Calendar.css";
import { useEffect, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CalendarDay from "./CalendarDay";
import axios from "axios";
import { modifyDate } from "../utils/modifyDate";

export default function Calendar() {
  const [calendar, setCalendar] = useState({
    year: new Date().getFullYear(),
    today: new Date().getDate(),
    month: new Date().getMonth(),
    numDaysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstDayOfMonth() {
      return new Date(this.year, this.month, 1).getDay();
    },
    numOfWeeks() {
      const fdom = this.firstDayOfMonth();
      const dim = this.numDaysInMonth();
      if ((fdom === 5 && dim === 31) || (fdom === 6 && dim >= 30)) return 6;
      else return 5;
    },
  });
  const [tasksByDay, setTasksByDay] = useState({});

  useEffect(() => {
    const { month, year } = calendar;
    axios
      .get(
        `${import.meta.env.VITE_API}/todo-list/?month=${month + 1}&year=${year}`
      )
      .then(({ data }) => {
        let taskObject = data.reduce((a, c) => {
          const month = c.due_date.slice(8, 10);
          a[month] ? a[month].push(c) : (a[month] = [c]);
          return a;
        }, {});

        setTasksByDay(taskObject);
      });
  }, [calendar.month, calendar.year]);

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handleNextOrPrevClick(event) {
    let { month } = calendar;
    event.target.id === "next"
      ? setCalendar({ ...calendar, month: month + 1 })
      : setCalendar({ ...calendar, month: month - 1 });
  }

  return (
    <div className="calendar___container">
      <div className="calendar___month-label">
        <ArrowBackIosNewOutlinedIcon
          id={!calendar.month ? "disable" : "back"}
          onClick={(e) => handleNextOrPrevClick(e)}
        />
        <div>{monthArray[calendar.month]}</div>
        <ArrowForwardIosOutlinedIcon
          id={calendar.month === 11 ? "disable" : "next"}
          onClick={(e) => handleNextOrPrevClick(e)}
        />
      </div>
      <div className="calendar___days-of-week">
        {new Array(
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ).map((dayOfWeek, i) => {
          return <div key={i}>{dayOfWeek}</div>;
        })}
      </div>
      {Array(calendar.numOfWeeks() * 7)
        .fill(0)
        .map((el, i) => {
          return (
            <CalendarDay
              key={i}
              index={i}
              calendar={calendar}
              tasksByDay={tasksByDay}
            />
          );
        })}
    </div>
  );
}
