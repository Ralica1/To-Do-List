import { createEventListener } from "./creatingProject";
import { listEvent } from "./creatingTask";
import { editContainerEventListener } from "./editingProject";
import { dragAndDropEvent } from "./dragAndDrop";
import { displayAllTasks } from "./homeSection";

listEvent();
createEventListener();
editContainerEventListener();
dragAndDropEvent();
displayAllTasks();

//hide side menu event listener
const hiddenMenu = document.querySelector(".hiddenMenu");
hiddenMenu.addEventListener("click", () => {
  const leftPanel = document.querySelector(".leftPanel");
  leftPanel.classList.toggle("hidden");
});

//on start up checked wheather its on light mode or dark mode
const checkbox = document.getElementById("checkbox");
let theme = localStorage.getItem("theme");

if (theme === "light") {
  checkbox.checked = true;
  document.body.classList.add("light");
} else {
  checkbox.checked = false;
  document.body.classList.remove("light");
}

checkbox.addEventListener("change", () => {
  if (checkbox.checked === true) {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});
