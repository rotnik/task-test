let nextId = 1;
let tasks = [];


function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) {
        li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        const id = parseInt(li.dataset.id);
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    });

    const span = document.createElement('span');
    span.textContent = task.description;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        const id = parseInt(li.dataset.id);
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}


function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; 

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

 
    pendingTasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });


    completedTasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}


function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const description = newTaskInput.value.trim();
    if (description) {
        const id = nextId++;
        tasks.push({ id, description, completed: false });
        renderTasks();
        newTaskInput.value = '';
    }
}


const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task');

addTaskBtn.addEventListener('click', addTask);

newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});


renderTasks();
