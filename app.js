const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        return;
    }

    const task = document.createElement("li");

    task.textContent = taskText;

    taskList.appendChild(task);

    taskInput.value = "";
});