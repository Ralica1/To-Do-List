import { projectList, saveToLocalStorage } from "./creatingProject";
import { hideDropDown, revertOptionLocation } from "./editingProject";
import { displayTask, processDateData } from "./creatingTask";
import { checkWhichHomeTile } from "./homeSection";

//style completed task
function styleCompletedTask(e){
    e.target.closest("li").querySelector(".list-details").classList.toggle("lineThrough", "fade");
    e.target.classList.toggle("checked");
}
//update the completed object data
function updateCompletedTask(e){
    let selectedTask = findSelectedTask(e.target.closest("li").id);
    selectedTask.completed = !selectedTask.completed;
    saveToLocalStorage();
}

//put styling on important task
function styleImportantTask(e){
    e.target.classList.toggle("listHidden");
    e.target.nextElementSibling.classList.toggle("listHidden");
}


//update important status on stored object
function updateImportantTask(e){
    let selectedTask = findSelectedTask(e.target.closest("li").id);
    selectedTask.important = !selectedTask.important;
    saveToLocalStorage();
    revertOptionLocation();
    refreshDisplay(selectedTask.dataProject);
}

//delete task from array
function deleteTask(e){
    let listNode = e.target.closest("li");
    let selectedTask = findSelectedTask(listNode.id);
    projectList[selectedTask.dataProject].taskList = projectList[selectedTask.dataProject].taskList.filter(task => task != selectedTask);
    saveToLocalStorage();
    revertOptionLocation();
    listNode.remove();
}


//find the task via id
function findSelectedTask(listId){
    return projectList.reduce((acc, project) => project.taskList.find(task => (task.id == listId)) || acc,{});
}

//process the input from the edit task form
function processEditTask(e){
    let form = e.target;
    let selectedTask = findSelectedTask(findHiddenTask().id);
    selectedTask.title = form.querySelector("#editListTitle").value;
    selectedTask.details = form.querySelector("#editListInputDetail").value;
    selectedTask.date = processDateData(form.querySelector("#editListInputDate").value);
    saveToLocalStorage();
    revertEditFormLocation();
    revertOptionLocation();
    showHiddenTask();
    refreshDisplay(selectedTask.dataProject);
    e.preventDefault();
}

//refresh the content display after its been edited/changed in some way
function refreshDisplay(dataProject){
    let selectedTile = document.querySelector(".selected");
    if(selectedTile.closest(".project")) displayTask(dataProject);
    else if(selectedTile.closest(".home")) checkWhichHomeTile(selectedTile);
}


//find and return the task that is hidden
function findHiddenTask(){
    return document.querySelector("li.hidden");
}
//reveal edit form for task
function showEditForm(e){
    hideDropDown(e.target.parentNode.parentNode);
    relocateEditListForm(e);
    document.getElementById("editListTitle").focus();
}
//move the edit form in place of the task you want to edit
function relocateEditListForm(e){
    let listNode = e.target.closest("li");
    document.querySelector("#editListContainer").style.display = "block";
    listNode.classList.add("hidden");
    listNode.parentNode.insertBefore(document.querySelector("#editListContainer"), listNode);
}

//move form from under the edited list to outside ul for standby
function revertEditFormLocation(){
    const editForm = document.querySelector("#editListForm");
    const listToDo = document.querySelector(".list-todo");

    editForm.classList.add("hidden");
    listToDo.appendChild(editForm);
}

//show the hidden task that was hidden during edit mode
function showHiddenTask(){
    const hiddenTask = document.querySelector("li.hidden");
    hiddenTask.classList.remove("hidden");
}

export {styleCompletedTask,styleImportantTask , updateCompletedTask, updateImportantTask 
    ,deleteTask, showEditForm,relocateEditListForm, revertEditFormLocation, processEditTask, showHiddenTask}