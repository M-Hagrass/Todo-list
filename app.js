// Define input and add tasks section variables
const personNameInput = document.querySelector('.personNameInput');
const personNameHead = document.querySelector('.personNameHead');
const personNameSpan = document.querySelector('.personNameSpan');
const bntPerson = document.querySelector('.bntPerson');
const btnOk = document.querySelector('.ok');
const PersonNameContainer = document.querySelector('.PersonNameContainer');
const form = document.querySelector('form');
const formInput = document.querySelector('.formInput');
const btnClearList = document.querySelector('.btnClearList');

// Define Filter and remove tasks section variables
const filterInput = document.querySelector('.filterInput');
const tasksList = document.querySelector('.tasksList');

// Run all event listeners
runAllEventListeners();

// Assign all event listeners
function runAllEventListeners(){
  // Get data from local storage
  document.addEventListener('DOMContentLoaded', getDataFromLocalStorage)
  // Add getPersonName event
  btnOk.addEventListener('click', getPersonName)
  // personNameInput.addEventListener('keyup', getPersonName)
  // changePersonName event
  bntPerson.addEventListener('click', changePersonName)
  // Add New task event
  form.addEventListener('submit', addTask)
  // Remove tasks
  tasksList.addEventListener('click', removeTask)
  // Clear all tasks list
  btnClearList.addEventListener('click', clearTasks)  
  // Filter tasks list
  filterInput.addEventListener('keyup', filterTask)  
}

// Create getPersonName function
function getPersonName(){
  if(personNameInput.value !== ''){
    personNameSpan.innerText = '';
    personNameSpan.appendChild(document.createTextNode(personNameInput.value));
    personNameInput.value = '';
    PersonNameContainer.style.display = 'none';
    personNameHead.style.fontSize = '1.2rem';
    bntPerson.style.display = 'block';
  } else {
    alert('Enter your name first');
  }
}

// Create changePersonName function
function changePersonName(){
  PersonNameContainer.style.display = 'flex';
  personNameHead.style.fontSize = '0rem';
  bntPerson.style.display = 'none';
}

// Create getDataFromLocalStorage function
function getDataFromLocalStorage(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Create li
    const li = document.createElement('li');
    li.className = 'taskItem';
    li.appendChild(document.createTextNode(task));
    // Create link
    const link = document.createElement('a');
    link.setAttribute("href", "#");
    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);
    tasksList.appendChild(li);
  })
}

// Create addTask function
function addTask(e){
  e.preventDefault();
  // Create li
  const li = document.createElement('li');
  li.className = 'taskItem';
  li.appendChild(document.createTextNode(formInput.value));
  // Create link
  const link = document.createElement('a');
  link.setAttribute("href", "#");
  link.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(link);
  tasksList.appendChild(li);
  setTasksToLocalStorage(formInput.value);
  formInput.value = '';
}

// Create setTasksToLocalStorage function
function setTasksToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create removeTask function
function removeTask(e){
  e.preventDefault();
  if(e.target.classList.contains('fa-times')){
    if(confirm('Are you sure')){
      e.target.parentElement.parentElement.remove();
      removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Create removeTasksFromLocalStorage function
function removeTasksFromLocalStorage(taskFromLi){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(taskFromLocalStorage, index){
    if(taskFromLi.textContent === taskFromLocalStorage){
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  })
}

// Create clearTasks function
function clearTasks(){
  if(confirm('Are sure! You will lost all your tasks')){
    // tasksList.innerHTML = '';
    while(tasksList.lastChild){
      tasksList.removeChild(tasksList.lastChild)
    }
    // Clear localStorage
    localStorage.clear();
  }
}

// Create filterTask function
function filterTask(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.taskItem').forEach(function(task, index){
    const taskContent = task.textContent.toLowerCase();
    if(taskContent.indexOf(text) !== -1){
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  })
}