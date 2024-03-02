import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { modifyDate } from "../utils/modifyDate.js";
import Task from "./Task.jsx";
import TaskModal from "./TaskModal.jsx";
import "../styles/todoLists.css";


export default function TodoLists() {
  const [tasks, setTasks] = useState([]);
  const [currentModal, setCurrentModal] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/todo-list/`).then(({ data }) => {
      setTasks(modifyDate(data));
    });
  }, []);


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
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            setCurrentModal={setCurrentModal}
          />
        );
      })}
      {currentModal.id && (
        <TaskModal task={currentModal.task} setCurrentModal={setCurrentModal} />
      )}
    </div>
  );
}
