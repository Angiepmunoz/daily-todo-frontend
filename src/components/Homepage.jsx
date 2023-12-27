import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { modifyDate } from "../helpers/modifyDate";

// const API = process.env.REACT_APP_API;
export default function Homepage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/todo-list/`).then(({ data }) => {
      const tasksWithModifiedDates = modifyDate(data)  
      setTasks(tasksWithModifiedDates);
    });
  });

  function navigateToTask(id){
    navigate(`/${id}`)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Time of Day</th>
            <th>Completed</th>
          </tr>
          {tasks.map((task, i) => {
            return (
              <tr key={i}>
                <td onClick={(id)=>navigateToTask(task.id)}>{task.name}</td>
                <td>{task.due_date}</td>
                <td>{task.time_of_day}</td>
                <td>{task.completed ? "✅" : "❌"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
