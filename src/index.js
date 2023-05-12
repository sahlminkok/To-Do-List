import './style.css';

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

function iterateList(objArray) {
  const ulList = document.querySelector('.toDoList');

  for (let i = 0; i < objArray.length; i += 1) {
    const list = objArray[i];

    // Create a new li element
    const li = document.createElement('li');

    // Set the inner html of the li to the object's properties
    li.innerHTML = `
      <input type="checkbox">
      <p>${list.description}</p>
      <p>${list.completed}</p>
      `;

    // Append the li to the ulList element
    ulList.appendChild(li);
  }
}

iterateList(toDoList);
