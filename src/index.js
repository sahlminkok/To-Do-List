import './style.css';
import ToDoList from './ToDoList.js';

const todoList = new ToDoList();

function addTask() {
  const taskInput = document.querySelector('.add');
  const taskDescription = taskInput.value.trim();

  if (taskDescription !== '') {
    todoList.addTask(taskDescription);
    taskInput.value = '';
  }
}

const add = document.querySelector('#addBtn');
add.addEventListener('click', addTask);

function clearCompletedTasks() {
  todoList.clearCompletedTasks();
}

const clearTasks = document.querySelector('.clear');
clearTasks.addEventListener('click', clearCompletedTasks);

todoList.renderTasks();
