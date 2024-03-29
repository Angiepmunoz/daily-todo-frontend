import { Link, useParams } from "react-router-dom";
import "../styles/TaskModal.css";

export default function TaskModal({ task, setTaskModal }) {
  // task = modifyDate(task)
  function handleModalClose() {
    setTaskModal({});
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
            {task.formatted_due_date} @ {task.formatted_time}
          </div>
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
