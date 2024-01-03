import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { modifyDate } from "../helpers/modifyDate";
import "../styles/todoLists.css"

// const API = process.env.REACT_APP_API;
export default function TodoLists() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/todo-list/`).then(({ data }) => {
      const tasksWithModifiedDates = modifyDate(data);
      setTasks(tasksWithModifiedDates);
    });
  });

  function navigateToTask(id) {
    navigate(`/${id}`);
  }

  return (
    <div className="todo-list-table">
      <div className="todo-list-table___column todo-list-table___column-headings">
        <div className="todo-list-table___column-headings">Task</div>
        <div className="todo-list-table___column-headings">Date</div>
        <div className="todo-list-table___column-headings">Time of Day</div>
        <div className="todo-list-table___column-headings">Completed</div>
      </div>
      {tasks.map((task, i) => {
        return (
          <div key={i} className="todo-list-table___column todo-list-table___row">
            <div className="todo-list-table___column-data" onClick={(id) => navigateToTask(task.id)}>{task.name}</div>
            <div className="todo-list-table___column-data">{task.due_date}</div>
            <div className="todo-list-table___column-data">{task.time_of_day}</div>
            <div className="todo-list-table___column-data">{task.completed ? "✅" : "❌"}</div>
          </div>
        );
      })}
    </div>
  );
}
