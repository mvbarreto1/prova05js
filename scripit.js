document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-title');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="remove" data-index="${index}">Remover</button>
            `;
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            tasks.push(taskTitle);
            saveTasks();
            taskInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove')) {
            const index = event.target.getAttribute('data-index');
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});