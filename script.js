const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

let tasks = [];

function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (added: ${task.date})`;
        
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => markTaskComplete(task.id);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(task.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        if (task.completed) {
            li.classList.add('completed');
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            date: new Date().toLocaleString()
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

function markTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        renderTasks();
    }
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText) {
            task.text = newText;
            renderTasks();
        }
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

addTaskButton.onclick = addTask;
