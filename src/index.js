// eslint-disable-next-line max-classes-per-file
import './style.css';

class Task {
  constructor(description, completed = false) {
    this.description = description;
    this.completed = completed;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this.taskList = document.querySelector('.toDoList');
    this.taskInput = document.querySelector('.add');
    this.addTaskBtn = document.querySelector('#addBtn');
    this.loadTasks();
    this.renderTasks();
    this.setupEventListeners();
  }

  addTask(description) {
    const newTask = new Task(description);
    this.tasks.push(newTask);
    this.saveTasks();
    this.taskInput.value = '';
    this.renderTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.updateTaskIndexes();
    this.saveTasks();
    this.renderTasks();
  }

  editTask(index, newDescription) {
    this.tasks[index].description = newDescription;
    this.saveTasks();
    this.renderTasks();
  }

  updateTaskIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  renderTasks() {
    this.taskList.innerHTML = '';

    this.tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('task');

      const div = document.createElement('div');
      div.classList.add('div');

      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      div.appendChild(input);

      const inputTask = document.createElement('input');
      inputTask.setAttribute('type', 'text');
      inputTask.value = `${task.description}`;
      inputTask.classList.add('inputTask');
      div.appendChild(inputTask);
      li.dataset.index = task.index;

      li.appendChild(div);

      const editButn = document.createElement('button');
      li.appendChild(editButn);

      const deleteButn = document.createElement('span');
      deleteButn.innerHTML = '\u00d7';
      deleteButn.classList.add('span');

      if (task.completed) {
        li.classList.add('completed');
      }

      // Mark task as completed when clicked
      li.addEventListener('click', () => {
        task.completed = !task.completed;
        this.saveTasks();
        this.renderTasks();
      });

      deleteButn.addEventListener('click', (event) => {
        event.stopPropagation();
        this.deleteTask(index);
      });

      li.appendChild(deleteButn);
      this.taskList.appendChild(li);
    });
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  setupEventListeners() {
    this.addTaskBtn.addEventListener('click', () => {
      const taskDescription = this.taskInput.value;

      if (taskDescription !== '') {
        this.addTask(taskDescription);
      }
    });

    this.taskList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const index = parseInt(event.target.dataset.index, 10);
        const taskDescription = prompt('Enter a new task description:', this.tasks[index].description);

        if (taskDescription !== null) {
          this.editTask(index, taskDescription);
        }
      } else if (event.target.tagName === 'SPAN') {
        const index = parseInt(event.target.parentElement.dataset.index, 10);
        this.deleteTask(index);
      }
    });
  }
}
// eslint-disable-next-line no-unused-vars
const todoList = new TodoList();

// let toDoList = [];

// function iterateList() {
//   const ulList = document.querySelector('.toDoList');
//   ulList.innerHTML = '';

//   toDoList.forEach((task) => {
//     const li = document.createElement('li');
//     li.classList.add('task');

//     const div = document.createElement('div');

//     const input = document.createElement('input');
//     input.setAttribute('type', 'checkbox');
//     div.appendChild(input);

//     const textNode = document.createTextNode(task.description);
//     div.appendChild(textNode);
//     li.dataset.index = task.index;

//     li.appendChild(div);

//     const deleteButn = document.createElement('input');
//     deleteButn.setAttribute('type', 'submit');
//     deleteButn.setAttribute('value', '');
//     li.appendChild(deleteButn);

//     if (task.completed) {
//       li.classList.add('completed');
//     }

//     // Mark task as completed when clicked
//     li.addEventListener('click', () => {
//       task.completed = !task.completed;
//       renderTasks();
//     });

//     ulList.appendChild(li);
//   });
//   // for (let i = 0; i < objArray.length; i += 1) {
//   //   const list = objArray[i];

//   //   // Create a new li element

//   //   // Set the inner html of the li to the object's properties
//   //   li.innerHTML = `
//   //     <input type="checkbox">
//   //     <p>${list.description}</p>
//   //     <p>${list.completed}</p>
//   //     `;

//   //   // Append the li to the ulList element
//   //   ulList.appendChild(li);
//   // }
// }

// const STORAGE_KEY = 'todoList';

// function saveTasks() {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(toDoList));
// }

// function loadTasks() {
//   const storedTasks = localStorage.getItem(STORAGE_KEY);

//   if (storedTasks) {
//     toDoList = JSON.parse(storedTasks);
//   }
// }

// loadTasks();

// function addTask() {
//   const taskInput = document.querySelector('.add');
//   const taskDescription = taskInput.value;

//   if (taskDescription !== '') {
//     const newTask = {
//       description: taskDescription,
//       completed: false,
//       index: toDoList.length + 1,
//     };

//     toDoList.push(newTask);
//     saveTasks();
//     taskInput.value = '';
//     iterateList();
//   }
// }

// const addBtn = document.querySelector('#addBtn');
// addBtn.addEventListener('click', addTask);

// function deleteTask(index) {
//   toDoList.splice(index, 1);
//   updateTaskIndexes();
//   saveTasks();
//   renderTasks();
// }

// function editTask(index, newDescription) {
//   toDoList[index].description = newDescription;
//   saveTasks();
//   renderTasks();
// }

// function updateTaskIndexes() {
//   toDoList.forEach((task, index) => {
//     task.index = index + 1;
//   });
// }

// iterateList();
