export function modifyDate(tasks) {
  if (Array.isArray(tasks)) {
    return tasks.map(modifyTaskObject);
  } else {
    return modifyTaskObject(tasks);
  }
}

function modifyTaskObject(task) {
  task.due_date = new Date(`${task.due_date}`).toLocaleDateString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeArr = task.time_of_day.split(":");
  task.time_of_day =
    timeArr[0] > 12
      ? `${timeArr[0] - 12}:${timeArr[1]} PM`
      : `${timeArr[0]}:${timeArr[1]} AM`;

  return task;
}
