let tasks = [];

window.onload = function() {
    loadTasksFromURL();

    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks.length && storedTasks) {
        tasks = storedTasks;
    }
    displayTasks();
    generateQRCode();
};

const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskContainer = document.getElementById('task-container');
const qrCodeElement = document.getElementById('qr-code');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {
        id: tasks.length,
        description: taskText,
        completed: false
    };

    tasks.push(task);
    displayTasks();
    taskInput.value = "";
    generateQRCode();
}

window.addTask = addTask;

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

    if (tasks.length === 0) {
        taskContainer.innerHTML = "<li>No tasks added yet!</li>";
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.toggleTask = function(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    displayTasks();
    generateQRCode();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
    generateQRCode();
};

function generateQRCode() {
    const baseURL = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    tasks.forEach((task, index) => {
        const taskKey = `task${index}`;
        const taskValue = `${task.completed ? "1" : "0"}:${task.description}`;
        params.append(taskKey, taskValue);
    });

    const fullURL = `${baseURL}?${params.toString()}`;
    qrCodeElement.innerHTML = '';

    $(qrCodeElement).qrcode({
        width: 128,
        height: 128,
        text: fullURL
    });
}

function loadTasksFromURL() {
    const params = new URLSearchParams(window.location.search);
    tasks = [];

    params.forEach((value, key) => {
        if (key.startsWith("task")) {
            const [completed, description] = value.split(":");
            tasks.push({
                id: tasks.length,
                description: description,
                completed: completed === "1"
            });
        }
    });
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
