import { useState } from "react";
export default function Task({ task, setShowModal, showModal, setTaskModal}) {
  // const [toggleCompletion, setToggleCompletion] = useState()
  function handleShowModal(id){

    // setShowModal({...showModal, [id]: true})
    setTaskModal({id, task})
  }
  return (
    <div className="todo-list-table___column todo-list-table___row">
      <div
        className="todo-list-table___column-data task-name"
        onClick={() => handleShowModal(task.id)}
      >
        {task.name}
      </div>
      <div className="todo-list-table___column-data">{task.formatted_due_date}</div>
      <div className="todo-list-table___column-data">{task.formatted_time}</div>
      <div className="todo-list-table___column-data">
        {task.completed ? "✅" : "❌"}
      </div>
    </div>
  );
}
