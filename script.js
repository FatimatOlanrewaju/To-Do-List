let taskInput = document.getElementById("new-task");
let addButton = document.getElementById("add");
let tasksToDo = document.getElementById("not-done");
let tasksDone = document.getElementById("done");


let inputLength = function() {
    return taskInput.value.length;
}

// Add Tasks
let addNewTask = function(taskTitle) {
    let tasksList = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    // let link = document.createElement("a");
    let editInput = document.createElement("input");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    

    label.innerText = taskTitle;
    checkBox.type = "checkbox";
    // link.innerHTML = '<i class="fa fa-trash"></i>';
    editInput.type = "text";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    
    tasksList.appendChild(checkBox);
    tasksList.appendChild(label);
    // tasksList.appendChild(link);
    tasksList.appendChild(editInput);
    tasksList.appendChild(deleteButton);
    tasksList.appendChild(editButton);
    
    return tasksList;
}

let addTaskElements = function() {
    if(taskInput.value == "") {
        alert("Please input a task.");
        return;
    }
    
    let tasksList = addNewTask(taskInput.value);
    tasksToDo.appendChild(tasksList);
    bindTaskEvents(tasksList, tasksCompleted);
    taskInput.value = "";
}

let editTaskElements = function() {
    let tasksList = this.parentNode;
    let editInput = tasksList.querySelector("input[type=text]");
    let label = tasksList.querySelector("label");
    let existInClass = tasksList.classList.contains("editMode");
    if (existInClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    tasksList.classList.toggle("editMode");
}

let deleteTaskElements = function() {
    let tasksList = this.parentNode;
    let ul = tasksList.parentNode; 
    ul.removeChild(tasksList);
}

let tasksCompleted = function() {
    let tasksList = this.parentNode;
    tasksDone.appendChild(tasksList);
    bindTaskEvents(tasksList, tasksIncomplete);
}

let tasksIncomplete = function() {
    let tasksList = this.parentNode;
    tasksToDo.appendChild(tasksList);
    bindTaskEvents(tasksList, tasksCompleted);
}

let enterKeyOnKeyboard = function(event) {
    if(inputLength() > 0 && event.which === 13) {
        addTaskElements();
    }
}

// addButton.onclick = addTaskElements;
addButton.addEventListener("click", addTaskElements);
taskInput.addEventListener("keypress", enterKeyOnKeyboard);

let bindTaskEvents = (tasksListItem, checkBoxEvent) => {
    let checkBox = tasksListItem.querySelector('input[type="checkbox"]');
    let deleteButton = tasksListItem.querySelector("button.delete");
    let editButton = tasksListItem.querySelector("button.edit");
    deleteButton.onclick = deleteTaskElements;
    editButton.onclick = editTaskElements;
    checkBox.onchange = checkBoxEvent;
}

for (let i = 0; i < tasksToDo.children.length; i++) {
    bindTaskEvents(tasksToDo.children[i], tasksCompleted);
}

for (let i = 0; i < tasksDone.children.length; i++) {
    bindTaskEvents(tasksDone.children[i], tasksIncomplete);
}