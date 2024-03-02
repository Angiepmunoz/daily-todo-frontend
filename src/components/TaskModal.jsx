import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { modifyDate } from "../utils/modifyDate";
import axios from "axios";
import "../styles/TaskModal.css";

export default function TaskModal({ task, setCurrentModal }) {
  // const [task, setTask] = useState({});
  // const { id } = useParams();
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API}/todo-list/${id}`)
  //     .then(({ data }) => {
  //       const tasksWithModifiedDate = modifyDate(data);
  //       setTask(tasksWithModifiedDate);
  //     });
  // });
  function handleModalClose() {
    setCurrentModal({});
  }

  return (
    <div className="view-task" onClick={handleModalClose}>
      <div className="view-task___content">
        <div className="view-task___header">
          <h3 className="view-task___header-name">{task.name}</h3>
          {task.completed ? (
            <div className="view-task___header-completed">"✅"</div>
          ) : null}
          <Link
            to={`/${task.id}/edit`}
            className="view-task___header-edit-link"
          >
            Edit
          </Link>
        </div>
        <div className="view-task___body">
          <div className="view-task___body-notes">Notes: {task.notes}</div>
          <div className="view-task___body-due-date">
            {task.due_date} @ {task.time_of_day}
          </div>
          {/* <div className="view-task___body-time-due"></div> */}
        </div>
        <div className="view-task___footer">
          <Link to={`/${task.id}`}>Show More</Link>
        </div>
      </div>
    </div>
  );
}

// id SERIAL PRIMARY KEY,
// name TEXT NOT NULL,
// notes TEXT,
// completed BOOLEAN DEFAULT false,
// due_date DATE NOT NULL,
// time_of_day TIME WITHOUT TIME ZONE NOT null,
// date_of_completion DATE DEFAULT null,
// weekly BOOLEAN DEFAULT false
