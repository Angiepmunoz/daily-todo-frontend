import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { modifyDate } from "../utils/modifyDate.js";
import Task from "./Task.jsx";
import TaskModal from "./TaskModal.jsx";
import "../styles/todoLists.css";

export default function TodoLists() {
  const [tasks, setTasks] = useState([]);
  const [taskModal, setTaskModal] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`${import.meta.env.VITE_API}/todo-list/`, {
        signal: controller.signal,
      })
      .then(({ data }) => {
        setTasks(data);
      })
      .catch((e) => {
        console.warn(e);
      });
    return () => {
      console.log("in abort function");
      controller.abort();
    };
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
        return <Task key={task.id} task={task} setTaskModal={setTaskModal} />;
      })}
      {taskModal.id && (
        <TaskModal task={taskModal.task} setTaskModal={setTaskModal} />
      )}
    </div>
  );
}
