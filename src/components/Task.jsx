import { Form, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { modifyDate } from "../helpers/modifyDate";
import axios from "axios";

export default function Task() {
  const [task, setTask] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/todo-list/${id}`)
      .then(({ data }) => {
        const tasksWithModifiedDate = modifyDate(data)
        setTask(tasksWithModifiedDate)
      });
  });

  return (
    <div className="single-task">
        <div>task.name</div>
        <div>Due Date</div>
        <div>task completion</div>
        <p>Notes</p>
    </div>
  )
}

// id SERIAL PRIMARY KEY,
// name TEXT NOT NULL,
// notes TEXT,
// completed BOOLEAN DEFAULT false,
// due_date DATE NOT NULL,
// time_of_day TIME WITHOUT TIME ZONE NOT null,
// date_of_completion DATE DEFAULT null,
// weekly BOOLEAN DEFAULT false
