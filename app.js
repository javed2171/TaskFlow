document.title = "TaskFlow — My Tasks";

// 1. DOM Selectors
const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const taskFilter = document.querySelector("#taskFilter");
const taskCount = document.querySelector("#taskCount");

// 2. Empty State Array (populates strictly from the interface)
const tasks = [];

// 3. Render Function
function renderTasks(filter = "all") {
    let filteredTasks = tasks;

    if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    taskList.innerHTML = "";

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span class="task-title">${task.title}</span>
            <button class="delete-btn">&times;</button>
        `;

        // Toggle task completion
        const checkbox = li.querySelector("input");
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks(taskFilter ? taskFilter.value : "all");
        });

        // Delete task
        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            const taskIndex = tasks.findIndex(t => t.id === task.id);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                renderTasks(taskFilter ? taskFilter.value : "all");
            }
        });

        taskList.appendChild(li);
    });

    if (taskCount) {
        taskCount.textContent = filteredTasks.length;
    }
}

// 4. Add Task Handler
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    tasks.push({
        id: Date.now(), // Generates a unique ID
        title: taskText,
        completed: false
    });

    renderTasks(taskFilter ? taskFilter.value : "all");
    taskInput.value = "";
});

// Allow pressing "Enter" in the input field to add a task
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// 5. Filter Listener
if (taskFilter) {
    taskFilter.addEventListener("change", event => {
        renderTasks(event.target.value);
    });
}

// Initial render (will render 0 tasks on load)
renderTasks();