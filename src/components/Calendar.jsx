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
    numOfWeeks(){
      const fdom = this.firstDayOfMonth();
      const dim = this.numDaysInMonth();
      if((fdom === 5 && dim === 31) || (fdom === 6 && dim >= 30)) return 6;
      else return 5;
    }
  });
  const currentMonth = {
    cYear: new Date().getFullYear(),
    cToday: new Date().getDate(),
    cMonth: new Date().getMonth(),
  }

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
  console.log(calendar.firstDayOfMonth())
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
      {Array(calendar.numOfWeeks()*7)
        .fill(0)
        .map((el, i) => {
          const {month} = calendar
          const {cMonth, cToday} = currentMonth
          let firstDayOfMonth = calendar.firstDayOfMonth()
          let day = i - firstDayOfMonth + 1
          if (i < firstDayOfMonth || day > calendar.numDaysInMonth()) {
            return <div className="calendar___day-div" key={i}></div>;
          } else if ( month === cMonth && i === cToday ){
            return <div className="calendar___day-div" key={i}>
              <div className="today">{i}</div>
            </div>
          } else {
            return (
              <div className="calendar___day-div" key={i}>
                <div>{day}</div>
              </div>
            );
          }
        })}
    </div>
  );
}

// Calendar();
