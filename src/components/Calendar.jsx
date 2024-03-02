import "../styles/Calendar.css";
import { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

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
  });

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
      {Array(35)
        .fill(0)
        .map((day, i) => {
          if (i < calendar.firstDayOfMonth() || i > calendar.numDaysInMonth()) {
            return <div className="calendar___day-div" key={i}></div>;
          } else {
            return (
              <div className="calendar___day-div" key={i}>
                {i}
              </div>
            );
          }
        })}
    </div>
  );
}

// Calendar();
