let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

const columns = {
  todo: document.getElementById("todo-list"),
  doing: document.getElementById("doing-list"),
  done: document.getElementById("done-list"),
};

function saveTasks() {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function renderTasks() {
  Object.values(columns).forEach(c => c.innerHTML = "");

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    div.draggable = true;
    div.dataset.id = task.id;

    div.innerHTML = `
      <span>${task.title}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
    `;

    div.addEventListener("click", e => {
      if (!e.target.classList.contains("delete-btn")) {
        openSubtaskModal(task.id);
      }
    });

    div.addEventListener("dragstart", dragStart);
    columns[task.status].appendChild(div);
  });
}

// ✅ Görev Silme
window.deleteTask = function(taskId) {
  if (!confirm("Bu görevi silmek istiyor musun?")) return;
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks();
  renderTasks();
};

// Görev ekleme
document.querySelectorAll(".add-task-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    let title = prompt("Görev adı:");
    if (title) {
      let newTask = { id: Date.now(), title, status: btn.dataset.status, subtasks: [] };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
    }
  });
});

// Drag & Drop
let draggedTask = null;
function dragStart(e) { draggedTask = e.target.dataset.id; }
document.querySelectorAll(".kanban-list").forEach(list => {
  list.addEventListener("dragover", e => e.preventDefault());
  list.addEventListener("drop", e => {
    let status = list.id.replace("-list", "");
    let task = tasks.find(t => t.id == draggedTask);
    task.status = status;
    saveTasks();
    renderTasks();
  });
});

renderTasks();
