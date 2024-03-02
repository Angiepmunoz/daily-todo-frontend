import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Nav from "./components/Nav.jsx";
import TodoLists from "./components/TodoLists.jsx";
import Calendar from "./components/Calendar.jsx";
import "./App.css";

function App() {
  const [view, setView] = useState("list");
  function handleViewClick(e) {
    setView(e.target.id);
  }
  return (
    <div className="main-page">
      <Nav />
      <Router>
        <main>
          <div className="main-page___view-choice">
            <ChecklistRtlOutlinedIcon
              id="list"
              className="main-page___view-choice___list"
              onClick={(e) => handleViewClick(e)}
            />
            <CalendarMonthOutlinedIcon
              id="calendar"
              className="main-page___view-choice___calendar"
              onClick={(e) => handleViewClick(e)}
            />
          </div>
          <Routes>
            {/* <Route path="/" element={<Calendar/>} /> */}
            <Route
              path="/"
              element={view === "list" ? <TodoLists /> : <Calendar />}
            />
            {/* <Route path="/:id" element={<Task/>} />
              <Route path="/:id/edit" element={< Task />} /> */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
