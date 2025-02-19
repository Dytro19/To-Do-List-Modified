const inputtdl = document.querySelector('.textarea');
const buttontdl = document.querySelector('.buttoninput');
const listtdl = document.querySelector('.todolist');
const inProgressList = document.querySelector('.inprogresslist');
const completedList = document.querySelector('.completedlist');

// Load todos from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTodoLists);

// Event Listeners
buttontdl.addEventListener('click', clickButton);
listtdl.addEventListener('click', okdel);
inProgressList.addEventListener('click', okdel);
completedList.addEventListener('click', okdel);

// Function to handle button click
function clickButton(e) {
    e.preventDefault();
    addTodo();
}

// Function to add a new todo item
function addTodo() {
    if (inputtdl.value === '') return;

    const todo = {
        text: inputtdl.value,
        id: Date.now(),
        status: 'todo' // 'todo', 'inprogress', 'completed'
    };

    createTodoElement(todo);
    saveTodoList(todo);

    inputtdl.value = '';
}

// Function to create todo element and append to list
function createTodoElement(todo) {
    const itemall = document.createElement('div');
    itemall.classList.add('itemall');
    itemall.setAttribute('data-id', todo.id);

    const item = document.createElement('p');
    item.classList.add('item');
    item.innerText = todo.text;
    itemall.appendChild(item);

    const inProgressButton = document.createElement("button");
    inProgressButton.innerHTML = '<i class="fa-solid fa-spinner"></i>';
    inProgressButton.classList.add("inprogress-button");
    itemall.appendChild(inProgressButton);

    const checkbutton = document.createElement("button");
    checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkbutton.classList.add("check-button");
    itemall.appendChild(checkbutton);

    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashbutton.classList.add("trash-button");
    itemall.appendChild(trashbutton);

    if (todo.status === 'completed') {
        itemall.classList.add('checklist');
        completedList.appendChild(itemall);
    } else if (todo.status === 'inprogress') {
        inProgressList.appendChild(itemall);
    } else {
        listtdl.appendChild(itemall);
    }
}

// Function to save todo list to localStorage
function saveTodoList(todo) {
    const todos = getTodosFromStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load todos from localStorage
function loadTodoLists() {
    const todos = getTodosFromStorage();
    todos.forEach(todo => {
        createTodoElement(todo);
    });
}

// Function to retrieve todos from localStorage
function getTodosFromStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

// Function to handle checking and deleting todo items
function okdel(e) {
    const item = e.target;

    // In Progress functionality
    if (item.closest('.inprogress-button')) {
        const todolist = item.closest('.itemall');
        const todoId = todolist.getAttribute('data-id');
        inProgressList.appendChild(todolist);
        updateTodoStatus(todoId, 'inprogress');
    }

    // Check functionality
    if (item.closest('.check-button')) {
        const todolist = item.closest('.itemall');
        const todoId = todolist.getAttribute('data-id');
        todolist.classList.toggle('checklist');
        if (todolist.classList.contains('checklist')) {
            completedList.appendChild(todolist);
            updateTodoStatus(todoId, 'completed');
        } else {
            listtdl.appendChild(todolist);
            updateTodoStatus(todoId, 'todo');
        }
    }

    // Delete functionality
    if (item.closest('.trash-button')) {
        const todolist = item.closest('.itemall');
        const todoId = todolist.getAttribute('data-id');
        todolist.remove();
        removeTodoFromStorage(todoId);
    }
}

// Function to update todo status in local storage
function updateTodoStatus(todoId, status) {
    const todos = getTodosFromStorage();
    const updatedTodos = todos.map(todo => {
        if (todo.id == todoId) {
            todo.status = status;
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

// Function to remove todo list from local storage
function removeTodoFromStorage(todoId) {
    const todos = getTodosFromStorage();
    const updatedTodos = todos.filter(todo => todo.id != todoId);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}




var modoscuro=localStorage.getItem('modoscuro')==="true";
if (modoscuro==null){
    modoscuro=false;
}
console.log(modoscuro);

document.getElementById("boton").addEventListener("click", ()=>{
    
    modoscuro= !modoscuro
    localStorage.setItem('modoscuro', modoscuro);
    cambioColor();
   
});

function cambioColor(){
    if (modoscuro==true){
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        console.log("modo oscuro activado");
    } else if (modoscuro==false){
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        console.log("modo oscuro desactivado");
    }
}

cambioColor();