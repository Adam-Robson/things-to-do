import { client } from "../services/client.js";

export async function createTodo(todo) {
  const res = await client
    .from('todo')
    .insert({
        todo,
        complete: false,
      user_id: client.auth.user().id
    })
    .single();

    return checkError(res);
}

export async function deleteAllTodos() {
  const res = await client
    .from('todo')
    .delete()
    .match({ user_id: client.auth.user().id });

  return checkError(res);
}

export async function getAllTodos() {
  const res = await client
    .from('todo')
    .select('*');
  console.log(res);
  return checkError(res);
}

export async function completeTodo(id) {
    const res = await client
        .from('todo')
        .update({ complete: true })
        .match({
            user_id: client.auth.user().id,
            id });
    return checkError(res);
}

function checkError({ data, error }) {
    if (error) {
        throw error;
    } else {
        return data;
    }
}
