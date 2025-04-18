const API_URL = "http://localhost:8000/todos";
const form = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ title, description })
  });

  if (res.ok) {
    loadTodos();
    form.reset();
  }
});

async function loadTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${todo.title}</strong><br>${todo.description || ''}
      <div class="actions">
        <button onclick="editTodo('${todo._id}', '${todo.title}', '${todo.description}')">✏️</button>
        <button onclick="deleteTodo('${todo._id}')">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTodos();
}

async function editTodo(id, oldTitle, oldDesc) {
  const title = prompt("Edit Title:", oldTitle);
  const description = prompt("Edit Description:", oldDesc);
  if (title !== null) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ title, description })
    });
    loadTodos();
  }
}

loadTodos();
