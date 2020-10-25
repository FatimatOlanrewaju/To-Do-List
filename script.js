let input = document.getElementById("new-task");
let addButton = document.getElementById("add");
let tasksToDo = document.getElementById("not-done");
let tasksDone = document.getElementById("done");

// Add Tasks

let inputLength = () => {
    return input.value.length;
}

// 
let addNewTask = (taskTitle) => {
    let tasksList = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    // let link = document.createElement("a");
    let editInput = document.createElement("input");
    let editButton = document.createElement("i");
    let deleteButton = document.createElement("i");

    checkBox.type = "checkBox";
    label.innerText = taskTitle;
    // link.innerHTML = '<i class="fa fa-trash"></i>';
    editInput.type = "text";
    editButton.className = "edit";
    deleteButton.className = "delete";

    tasksList.appendChild(textInput);
    tasksList.appendChild(checkBox);
    tasksList.appendChild(label);
    // tasksList.appendChild(link);
    tasksList.appendChild(editButton);
    tasksList.appendChild(deleteButton);

    return tasksList;
}

let addTaskElements = () => {
    if(inputLength < 0) {
        alert("Please input a task.")
    }
    
    let tasksList = addNewTask(input.value);
    tasksToDo.appendChild(tasksList);
    bindTaskEvents(tasksList, tasksCompleted);
    input.value = "";
}

let editTaskElements = () => {
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

let deleteTaskElements = () => {
    let tasksList = this.parentNode;
    let ul = tasksList.parentNode;
    ul.removeChild(tasksList);
}

let tasksCompleted = () => {
    let tasksList = this.parentNode;
    tasksDone.appendChild(tasksList);
    bindTaskEvents(tasksList, tasksIncomplete);
}

let tasksIncomplete = () => {
    let tasksList = this.parentNode;
    tasksToDo.appendChild(tasksList);
    bindTaskEvents(tasksList, tasksCompleted);
}

let EnterKeyOnKeyboard = (event) => {
    if(inputLength() > 0 && event.which === 13) {
        addTaskElements();
    }
}

addButton.addEventListener("click", addTaskElements);
input.addEventListener("keypress", EnterKeyOnKeyboard);

let bindTaskEvents = (tasksListItem, checkBoxEvent) {
    let checkBox = tasksListItem.querySelector('input[type="checkbox"]');
    let editButton = tasksListItem.querySelector("i");
    let deleteButton = tasksListItem.querySelector("i");
    editButton.onclick = editTaskElements;
    deleteButton.onclick = deleteTaskElements;
    checkBox.onchange = checkBoxEvent;
}