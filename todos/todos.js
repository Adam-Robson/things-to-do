import {
    createTodo,
    completeTodo,
    getAllTodos,
    deleteAllTodos,
} from './fetch-utils.js';
import { renderTodo } from './render-utils.js';
import { signOutUser } from '../auth.js';

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const signOutButton = document.querySelector('#sign-out-button');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(todoForm);
    const todo = formData.get('todo');

    const res = await createTodo(todo);

    todoForm.reset();

    const error = res.error;

    if (error) {
        console.error('There was an error creating the todo:', error.message);
    } else {
        displayTodos();
    }
});

let todos = [];

async function handleComplete(todo) {
  const update = {
    complete: true,
  };

  const res = await completeTodo(todo.id, update);

  if (res.error) {
    console.error('There wa an error completing the todo: ', res.error);
  } else {
    const completed = res.data;
    const index = todos.indexOf(todo);
    todos[index] = completed;

    displayTodos();
    }
}


async function displayTodos() {
  todosEl.innerHTML = '';
  const todos = await getAllTodos();

  for (let todo of todos) {
    const renderedTodo = renderTodo(todo, handleComplete);
    todosEl.append(renderedTodo);
    }

}

async function loadTodos() {
    displayTodos();
}

loadTodos();

signOutButton.addEventListener('click', () => {
    signOutUser();
});


deleteButton.addEventListener('click', async () => {
    const message = 'Are you sure you want to delete all todos?';
    if (!confirm(message)) return;
    const res = await deleteAllTodos();
    if (!res.error) {
      todos = [];
    }
    displayTodos();
});
