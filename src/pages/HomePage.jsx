import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useState } from "react";
import TodoLists from "../components/TodoLists.jsx";
import Calendar from "../components/Calendar.jsx";
export default function HomePage() {
  const [view, setView] = useState("list");
  function handleViewClick(e) {
    setView(e.target.id);
  }
  return (
    <main>
      <div className="home-page___view-choice">
        <ChecklistRtlOutlinedIcon
          id="list"
          className="home-page___view-choice___list"
          onClick={(e) => handleViewClick(e)}
        />
        <CalendarMonthOutlinedIcon
          id="calendar"
          className="home-page___view-choice___calendar"
          onClick={(e) => handleViewClick(e)}
        />
      </div>
      {view === "list" ? <TodoLists/> : <Calendar/>}
    </main>
  );
}
