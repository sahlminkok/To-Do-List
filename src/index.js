import './style.css';

const list = document.querySelector('.toDoList');

const toDoList = [
  {
    description: 'task 1',
    completed: true,
    index: 1,
  },
  {
    description: 'task 2',
    completed: true,
    index: 2,
  },
  {
    description: 'task 3',
    completed: true,
    index: 3,
  },
  {
    description: 'task 4',
    completed: true,
    index: 4,
  },
];

let $toDoList = '';

for (let i = 0; i < toDoList.length; i += 1) {
  $toDoList += `
    <li>
      <input type="checkbox">
      <p>${toDoList.description}</p>
      <p>${toDoList.completed}</p>
    </li>
    `;
}

list.innerHTML = $toDoList;