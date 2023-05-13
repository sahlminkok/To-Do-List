import './style.css';

class Task {
  constructor(description, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }
}

class ToDoList {
  constructor() {
    this.tasks = [];
    this.loadTasksFromStorage();
  }

  addTask(description) {
    const index = this.tasks.length + 1;
    const task = new Task(description, index);
    this.tasks.push(task);
    this.renderTasks();
    this.saveTasksToStorage();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.updateIndexes();
    this.renderTasks();
    this.saveTasksToStorage();
  }

  editTask(index, newDescription) {
    this.tasks[index].description = newDescription.trim();
    this.tasks[index].editing = false;
    this.renderTasks();
    this.saveTasksToStorage();
  }

  toggleCompletion(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.renderTasks();
    this.saveTasksToStorage();
  }

  toggleEditTask(index) {
    this.tasks[index].editing = !this.tasks[index].editing;
    this.renderTasks();
  }

  updateIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  renderTasks() {
    const taskList = document.querySelector('.toDoList');
    taskList.innerHTML = '';

    this.tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('task');

      const div = document.createElement('div');
      div.classList.add('div');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        this.toggleCompletion(index);
      });

      const description = document.createElement('span');
      description.textContent = task.description;
      description.className = task.completed ? 'completed' : '';
      description.addEventListener('click', () => {
        this.toggleEditTask(index);
      });

      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = task.description;
      editInput.style.display = task.editing ? 'inline-block' : 'none';
      editInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          this.editTask(index, editInput.value);
        }
      });

      li.dataset.index = task.index;

      li.appendChild(div);

      const editButn = document.createElement('button');
      editButn.className = 'hide';
      li.appendChild(editButn);

      const deleteButn = document.createElement('span');
      deleteButn.innerHTML = '\u00d7';
      deleteButn.classList.add('span');
      deleteButn.onclick = () => {
        this.removeTask(index);
      };

      div.appendChild(checkbox);
      div.appendChild(description);
      div.appendChild(editInput);

      li.appendChild(deleteButn);
      taskList.appendChild(li);
    });
  }

  saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}

const todoList = new ToDoList();

function addTask() {
  const taskInput = document.querySelector('.add');
  const taskDescription = taskInput.value.trim();

  if (taskDescription !== '') {
    todoList.addTask(taskDescription);
    taskInput.value = '';
  }
}

todoList.renderTasks();
