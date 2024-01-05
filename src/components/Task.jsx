export default function Task({ task, setShowModal, showModal, setCurrentModal}) {
function handleShowModal(id){
    setShowModal({...showModal, [id]: true})
    setCurrentModal({id, task})
}
  return (
    <div className="todo-list-table___column todo-list-table___row">
      <div
        className="todo-list-table___column-data"
        onClick={() => handleShowModal(task.id)}
      >
        {task.name}
      </div>
      <div className="todo-list-table___column-data">{task.due_date}</div>
      <div className="todo-list-table___column-data">{task.time_of_day}</div>
      <div className="todo-list-table___column-data">
        {task.completed ? "✅" : "❌"}
      </div>
    </div>
  );
}
