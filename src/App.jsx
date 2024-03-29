import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import TaskDetails from "./components/TaskDetails.jsx";
import HomePage from "./pages/HomePage.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";

function App() {
  return (
    <div className="main-page">
      <Router>
          <Nav />
          <Routes>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<TaskDetails />} />
            {/*<Route path="/:id/edit" element={< Task />} /> */}
            {/* </LocalizationProvider> */}
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
