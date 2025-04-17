let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow';
      
      // Create checkbox and text container
      const content = document.createElement('div');
      content.className = 'flex flex-col gap-3';
      
      const header = document.createElement('div');
      header.className = 'flex items-center justify-between';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.className = 'w-4 h-4 text-blue-500';
      checkbox.onclick = () => toggleTodo(index);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'text-red-500 hover:text-red-700 text-xl';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.onclick = () => deleteTodo(index);

      header.appendChild(checkbox);
      header.appendChild(deleteBtn);

      const text = document.createElement('p');
      text.className = todo.completed ? 
          'text-gray-400 line-through mt-2' : 
          'text-gray-700 mt-2';
      text.textContent = todo.text;

      content.appendChild(header);
      content.appendChild(text);
      card.appendChild(content);
      todoList.appendChild(card);
  });
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        todos.push({ text, completed: false });
        input.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Enter key to add todo
document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
renderTodos();