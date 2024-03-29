import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { formatDate, formatTime } from "../utils/modifyDate";

import axios from "axios";
import "../styles/TaskDetails.css";

//NEED TO DO DUE DATE AND TIME OF DAY
// Need to end the event listener when a user submits changes and when the component unmounts

export default function TaskDetails() {
  const [task, setTask] = useState({});
  const [editInput, setEditInput] = useState(""); // LOOK INTO REDUCER
  const [showSave, setShowSave] = useState(false);

  const inputRef = useRef(null);

  const { id } = useParams();
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    axios
      .get(`${API}/todo-list/${id}`)
      .then(({ data }) => {
        setTask(data);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [id]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editInput]);

  function handleInputClick(e) {
    setEditInput(e.target.id);
  }

  function handleChange(e) {
    if (!showSave) setShowSave(!showSave);
    setTask({ ...task, [e.target.id]: e.target.value });
  }
  function handleCheckboxChange(e) {
    if (!showSave) setShowSave(!showSave);
    task.completed
      ? setTask({ ...task, completed: !task.completed })
      : setTask({
          ...task,
          completed: !task.completed,
          date_of_completion: Date.now(),
        });
  }

  function handleTimeAndDateChange(e) {
    if (!showSave) setShowSave(!showSave);
    const { name, value } = e.target;
    if (name === "due_date") {
      const formatted_due_date = formatDate(value);
      setTask({
        ...task,
        [name]: value,
        formatted_due_date: formatted_due_date,
      });
    } else {
      const formatted_time = formatTime(value);
      setTask({ ...task, [name]: value, formatted_time: formatted_time });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`${API}/todo-list/${id}`, task)
      .then(({ data }) => {
        setShowSave(!showSave);
      })
      .catch((e) => console.warn(e));
  }

  return (
    <section className="task-details-section">
      <form className="task-details-form" onSubmit={handleSubmit}>
        {editInput === "name" ? (
          <input
            type="text"
            name="name"
            id="name"
            value={task.name}
            ref={editInput === "name" && inputRef}
            onChange={handleChange}
            onBlur={() => setEditInput("")}
          />
        ) : (
          <h1 id="name" onClick={(e) => handleInputClick(e)}>
            {task.name}
          </h1>
        )}

        {editInput === "notes" ? (
          <textarea
            type="textarea"
            name="notes"
            id="notes"
            value={task.notes}
            ref={editInput === "notes" && inputRef}
            onChange={handleChange}
            onBlur={() => setEditInput("")}
          />
        ) : (
          <p id="notes" onClick={(e) => handleInputClick(e)}>
            {task.notes}
          </p>
        )}
        {editInput === "due_date" ? (
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={task.due_date}
            ref={editInput === "due_date" && inputRef}
            onChange={(e) => handleTimeAndDateChange(e)}
            onBlur={() => setEditInput("")}
          />
        ) : (
          <h4 id="due_date" onClick={(e) => handleInputClick(e)}>
            {task.formatted_due_date}
          </h4>
        )}
        {editInput === "time_of_day" ? (
          <input
            type="time"
            name="time_of_day"
            id="time_of_day"
            value={task.time_of_day}
            ref={editInput === "time_of_day" && inputRef}
            onChange={(e) => handleTimeAndDateChange(e)}
            onBlur={() => setEditInput("")}
          />
        ) : (
          <h4 id="time_of_day" onClick={(e) => handleInputClick(e)}>
            {task.formatted_time}
          </h4>
        )}
        <label>
          Completed:
          <input
            type="checkbox"
            value={task.completed}
            id="completed"
            name="completed"
            onChange={handleCheckboxChange}
          />
        </label>
        {showSave && <button type="submit">Save Changes</button>}
      </form>
    </section>
  );
}

// move to its own component
