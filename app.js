// Define input and add tasks section variables
const personNameInput = document.querySelector('.personNameInput');
const personNameHead = document.querySelector('.personNameHead');
const personNameSpan = document.querySelector('.personNameSpan');
const btnOk = document.querySelector('.ok');
const PersonNameContainer = document.querySelector('.PersonNameContainer');
const form = document.querySelector('form');
const formInput = document.querySelector('.formInput');
const btnClearList = document.querySelector('.btnClearList')

// Define Filter and remove tasks section variables
const filterInput = document.querySelector('.filterInput');
const tasksList = document.querySelector('.tasksList');

// Run all event listeners
runAllEventListeners();

// Assign all event listeners
function runAllEventListeners(){
  // Add person name event
  btnOk.addEventListener('click', personName)
  // Add New task event
  form.addEventListener('submit', addTask)
}

// Create person name function
function personName(){
    console.log(personNameInput.value);
    personNameSpan.innerText = '';
    personNameSpan.appendChild(document.createTextNode(personNameInput.value));
    personNameInput.value = '';
    PersonNameContainer.style.display = 'none';
    personNameHead.style.fontSize = '1.2rem';
}

// Create addTask function
function addTask(e){
  console.log('hello')
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
  formInput.value = '';
}