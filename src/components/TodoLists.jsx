import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { modifyDate } from "../helpers/modifyDate";
import Task from "./Task.jsx";
import TaskModal from "./TaskModal.jsx";
import "../styles/todoLists.css";

// const API = process.env.REACT_APP_API;
export default function TodoLists() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState({});
  const [currentModal, setCurrentModal] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/todo-list/`).then(({ data }) => {
      const tasksWithModifiedDates = modifyDate(data);
      setTasks(tasksWithModifiedDates);
      const modalInitialStateObj = createModalObj(tasksWithModifiedDates);
      setShowModal(modalInitialStateObj);
    });
  }, []);

  function createModalObj(tasks) {
    const taskIdObj = {};
    tasks.forEach((task) => {
      taskIdObj[task.id] = false;
    });
    return taskIdObj;
  }

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
          <Task
            key={task.id}
            task={task}
            setShowModal={setShowModal}
            showModal={showModal}
            setCurrentModal={setCurrentModal}
          />
        );
      })}
      {currentModal.id && <TaskModal task={currentModal.task}/>}
    </div>
  );
}
