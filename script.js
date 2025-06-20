const taskList = document.createElement("ul");
const mainElement = document.querySelector('main');
mainElement.appendChild(taskList);

function addTask() {
    let taskInput = document.getElementById("task-input").value;

    // taskList.innerHTML = ""

    if (!taskInput.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Task',
            text: 'Please enter a task.',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    else {
        let task = document.createElement("li");

        mainElement.appendChild(taskList);
    }
}