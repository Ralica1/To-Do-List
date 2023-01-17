function addTask() {
  // Get the task input value
  const task = document.getElementById("task").value;
  // Check if the task input is not empty
  if (task) {
    // Create a new list item
    const li = document.createElement("li");
    // Create a new span element to hold the task text
    const span = document.createElement("span");
    // Create a new button element for the remove task button
    const btn = document.createElement("button");
    // Set the task text as the span text content
    span.textContent = task;
    // Set the button text as "X"
    btn.textContent = "X";
    // Add an onclick event listener to the remove button
    btn.onclick = removeTask;
    // Append the span and button to the list item
    li.appendChild(span);
    li.appendChild(btn);
    // Get the task list element
    const taskList = document.getElementById("task-list");
    // Append the list item to the task list
    taskList.appendChild(li);
    // Clear the task input
    document.getElementById("task").value = "";
  }
}
function removeTask(e) {
  const li = e.target.parentElement;
  const taskList = document.getElementById("task-list");
  taskList.removeChild(li);
}
// Save data to local storage
function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

// Load data from local storage
function loadData() {
  return JSON.parse(localStorage.getItem("data")) || [];
}

// Add a new task to the data
function addTask() {
  const task = document.getElementById("task").value;
  if (task) {
    addTaskToData(task);
    displayTasks();
    document.getElementById("task").value = "";
  }
}

document.getElementById("add-task-btn").onclick = addTask;

function addTaskToData(task) {
  const data = loadData();
  data.push({ task: task, completed: false });
  saveData(data);
}

// Remove a task from the data
function removeTask(task) {
  let data = loadData();
  data = data.filter((item) => item.task !== task);
  saveData(data);
}

// Mark a task as completed
function markAsCompleted(task) {
  let data = loadData();
  data = data.map((item) => {
    if (item.task === task) {
      item.completed = true;
    }
    return item;
  });
  saveData(data);
}
function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  const data = loadData();
  for (let i = 0; i < data.length; i++) {
    const task = data[i];
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.task;
    if (task.completed) {
      span.classList.add("completed");
    }
    li.appendChild(span);
    taskList.appendChild(li);
  }
}
