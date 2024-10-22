

let tasks = [];


const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskContainer = document.getElementById('task-container');


function addTask() {
    const taskText = taskInput.value;
    if (taskText === "") return;
    
    const task = {
        id: tasks.length,
        description: taskText,
        completed: false
    };
    
    tasks.push(task);
    displayTasks();
    taskInput.value = "";
}


function displayTasks() {
    taskContainer.innerHTML = "";
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${task.id})">
            ${task.description}
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskContainer.appendChild(taskItem);
    });
}


function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    displayTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}


addTaskButton.addEventListener('click', addTask);
