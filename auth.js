import { client } from './services/client.js';

function getUser() {
  const user = client.auth.user();

  if (!user) {
    console.error('Error getting user');
    throw new Error('User not found');
  }

  return user;
}

async function signUpUser(email, password) {
  const { user, error } = await client.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error signing up user:', error);
    throw error;
  }

  return user;
}

async function signInUser(email, password) {
  try {
    const { user, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in user:', error);
      throw error;
    }

    return user;

  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
}

function signOutUser() {
  return client.auth.signOut();
}

export {
  getUser,
  signUpUser,
  signInUser,
  signOutUser
};
