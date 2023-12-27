export function modifyDate(tasks) {
  return tasks.map((task) => {
    task.due_date = new Date(`${task.due_date}`).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return task;
  });
}
