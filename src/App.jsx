import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Task from "./components/Task.jsx"
import Nav from "./components/Nav.jsx";
import TodoLists from "./components/TodoLists.jsx";
import "./App.css";

function App() {

  return (
      <div className="main-page">
        <Router>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<TodoLists/>} />
              <Route path="/:id" element={<Task/>} />
            </Routes>
          </main>
        </Router>
      </div>
  );
}

export default App;
