// Select the <ul> where tasks will be displayed
const taskList = document.getElementById("task-list");

// Main function triggered on form submission
function addTask() {
    const taskInput = document.getElementById("task-input").value;

    // Validate input (non-empty)
    if (!taskInput.trim()) {
        Swal.fire({
            icon: 'warning',
            title: 'Empty Task',
            text: 'Task text cannot be empty.',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    // Create and append the new task
    const taskElement = createTaskElement(taskInput);
    taskList.appendChild(taskElement);

    // Clear input field
    document.getElementById("task-input").value = "";
}

// Build the full <li> element representing a task
function createTaskElement(text) {
    const task = document.createElement("li");

    let taskText = createTaskText(text);
    const completeBtn = createCompleteButton(taskText);
    const editBtn = createEditButton(taskText, task);
    const deleteBtn = createDeleteButton(task);

    // Add all elements to the task
    task.appendChild(taskText);
    task.appendChild(completeBtn);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    return task;
}

// Create the <span> element that shows the task text
function createTaskText(text) {
    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("task-text");
    return span;
}

// Create the ✅ complete button and toggle completed style
function createCompleteButton(taskTextEl) {
    const btn = document.createElement("button");
    btn.textContent = "✅";
    btn.addEventListener("click", () => {
        taskTextEl.classList.toggle("completed");
    });
    return btn;
}

// Create the ✏️ edit button and handle text editing logic
function createEditButton(taskTextEl, taskEl) {
    const btn = document.createElement("button");
    btn.textContent = "✏️";
    let isEditing = false;

    btn.addEventListener("click", () => {
        if (!isEditing) {
            // Switch to edit mode: replace span with input
            const inputEdit = document.createElement("input");
            inputEdit.type = "text";
            inputEdit.value = taskTextEl.textContent;
            inputEdit.classList.add("edit-input");

            taskEl.replaceChild(inputEdit, taskTextEl);
            btn.textContent = "💾";
            isEditing = true;

        } else {
            // Save changes and switch back to view mode
            const inputEdit = taskEl.querySelector("input");
            const newText = inputEdit.value.trim();

            if (!newText) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Empty Task',
                    text: 'Task text cannot be empty.',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }

            taskTextEl = createTaskText(newText);
            taskEl.replaceChild(taskTextEl, inputEdit);
            btn.textContent = "✏️";
            isEditing = false;

            // Show a success toast message
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Task updated successfully',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        }
    });

    return btn;
}

// Create the ❌ delete button and remove the task from the DOM
function createDeleteButton(taskEl) {
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.addEventListener("click", () => {
        taskEl.remove();
    });
    return btn;
}
