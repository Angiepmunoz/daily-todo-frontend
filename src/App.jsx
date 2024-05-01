import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import TaskDetails from "./components/TaskDetails.jsx";
import HomePage from "./pages/HomePage.jsx";
import "./App.css";

function App() {
  return (
    <div className="main-page">
      <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<TaskDetails />} />
            {/*<Route path="/:id/edit" element={< Task />} /> */}
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
