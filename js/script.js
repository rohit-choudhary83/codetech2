document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => createTaskElement(task));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        createTaskElement(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);
}

function editTask(element) {
    const taskItem = element.parentElement;
    const taskSpan = taskItem.querySelector('span');
    const oldText = taskSpan.textContent;

    const newText = prompt('Edit your task:', oldText);
    if (newText !== null && newText.trim() !== '') {
        taskSpan.textContent = newText.trim();
        updateTaskInLocalStorage(oldText, newText.trim());
    }
}

function deleteTask(element) {
    const taskItem = element.parentElement;
    const taskText = taskItem.querySelector('span').textContent;
    removeTaskFromLocalStorage(taskText);
    taskItem.remove();
}

function updateTaskInLocalStorage(oldText, newText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => task === oldText ? newText : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}
