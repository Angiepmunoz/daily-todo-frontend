import "../styles/Calendar.css";
import { useEffect, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CalendarDay from "./CalendarDay";
import axios from "axios";
import {
  numDaysInMonth,
  firstDayOfMonth,
  numOfWeeks,
} from "../utils/buildCalendar";

/*****TASK MODAL ISNT WORKING CORRECTLY */

export default function Calendar() {
  const [calendar, setCalendar] = useState({
    year: new Date().getFullYear(),
    today: new Date().getDate(),
    month: new Date().getMonth(),
  });

  const [tasksByDay, setTasksByDay] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    console.log("useEffect ran");
    const { month, year } = calendar;
    axios
      .get(
        `${import.meta.env.VITE_API}/todo-list/?month=${
          month + 1
        }&year=${year}`,
        { signal: controller.signal }
      )
      .then(({ data }) => {
        let taskObject = data.reduce((a, c) => {
          const month = c.due_date.slice(8, 10);
          a[month] ? a[month].push(c) : (a[month] = [c]);
          return a;
        }, {});
        console.log("state is update");
        setTasksByDay(taskObject);
      })
      .catch((error) => {
        error.name === "CanceledError"
          ? console.log("successfully aborted")
          : console.log({ error });
      });
    return () => {
      console.log("in abort function");
      controller.abort();
    };
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

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const ndim = numDaysInMonth(calendar.year, calendar.month);
  const fdom = firstDayOfMonth(calendar.year, calendar.month);
  const calcNumOfWeeks = numOfWeeks(fdom, ndim);

  function handleNextOrPrevClick(event) {
    let { month, year } = calendar;

    event.target.id === "next"
      ? setCalendar({
          ...calendar,
          month: month === 11 ? 0 : month + 1,
          year: month === 11 ? year + 1 : year,
        })
      : setCalendar({
          ...calendar,
          month: month ? (month - 1) % 11 : 11,
          year: month === 0 ? year -1 : year,
        });
  }
  console.log("calendar:", calendar);
  return (
    <div className="calendar___container">
      <div className="calendar___month">
        <ArrowBackIosNewOutlinedIcon
          id="back"
          onClick={(e) => handleNextOrPrevClick(e)}
        />
        <div className="calendar___month-label">
          {monthArray[calendar.month]} {calendar.year}
        </div>
        <ArrowForwardIosOutlinedIcon
          id="next"
          onClick={(e) => handleNextOrPrevClick(e)}
        />
      </div>
      <div className="calendar___days-of-week">
        {daysOfWeek.map((dayOfWeek, i) => {
          return <div key={i}>{dayOfWeek}</div>;
        })}
      </div>
      {Array(calcNumOfWeeks * 7)
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
