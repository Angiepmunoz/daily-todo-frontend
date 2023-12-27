import { useEffect, useState } from "react";
import axios from "axios";
import { modifyDate } from "../helpers/modifyDate";

// const API = process.env.REACT_APP_API;
export default function Homepage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/todo-list/`).then(({ data }) => {
      const tasksWithModifiedDates = modifyDate(data)  
      setTasks(tasksWithModifiedDates);
    });
  });

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
                <td>{task.name}</td>
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
