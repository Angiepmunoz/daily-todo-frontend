import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Task from "./components/Task.jsx"
import "./App.css";

function App() {

  return (
    <>
      <div>
        <Router>
          <nav></nav>
          <main>
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/:id" element={<Task/>} />
            </Routes>
          </main>
        </Router>
      </div>
    </>
  );
}

export default App;
