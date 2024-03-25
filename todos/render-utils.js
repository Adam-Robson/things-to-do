export function renderTodo(todo, handleComplete) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    if (todo.complete === true) {
        div.classList.add('complete');
    } else {
        div.classList.add('incomplete');
    }
    div.classList.add('todo');
    p.textContent = todo.todo;
    div.append(p);

    div.addEventListener('click', () => {
        handleComplete(todo);
    });
    return div;
}
