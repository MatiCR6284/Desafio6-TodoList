let tasks = [
    { id: 1, description: "Hacer las compras", completed: false },
    { id: 2, description: "Buscar al hijo del colegio", completed: false },
    { id: 3, description: "Terminar ensayo", completed: true },
];

const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");

function updateUI() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `<strong>ID: ${task.id}</strong> - ${task.description}`;

        const completeButton = document.createElement("button");
        completeButton.textContent = "Cambiar";
        completeButton.className = "complete";
        completeButton.onclick = () => toggleTask(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteTask(task.id);

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}

function addTask() {
    const description = taskInput.value.trim();
    if (description === "") return;

    const newTask = {
        id: Date.now(),
        description,
        completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    updateUI();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateUI();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        updateUI();
    }
}

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

updateUI();
