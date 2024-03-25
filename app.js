import {
  signUpUser,
  signInUser
} from './auth.js';

/**
 * DOM
 */

const authHeader = document.getElementById('auth-header');
const authForm = document.getElementById('auth-form');
const authButton = document.getElementById('auth-button');
const authLink = document.getElementById('auth-link');
const authError = document.getElementById('auth-error');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

/**
 * State
 */

let signIn = true;

/**
 *   Utility functions
 */

function displayAuth() {
  if (signIn) {
    authHeader.textContent = 'Sign in to your account';
    authButton.textContent = 'Sign In';
    authLink.textContent = 'Need to create an account?';
  } else {
    authHeader.textContent = 'Create a new account';
    authButton.textContent = 'Sign Up';
    authLink.textContent = 'Already have an account?';
  }
}

/**
 * Event listeners
 */

window.addEventListener('load', () => {
  displayAuth();
});

authLink.addEventListener('click', (e) => {
  e.preventDefault();
  signIn = !signIn;
  displayAuth();
});

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  authError.textContent = '';
  authButton.disabled = true;

  const formData = new FormData(authForm);
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    authError.textContent = 'Email and password are required';
    return;
  }

  try {
    let res;

    if (signIn) {
      res = await signInUser(formData.get('email'), formData.get('password'));
    } else {
      res = await signUpUser(formData.get('email'), formData.get('password'));
    }

    const error = res.error;

    if (error) {
      authError.textContent = error.message || 'An error occurred';
      authButton.disabled = false;
    } else {
      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get('redirectUrl') || '/';
      location.replace(redirectUrl);
    }
  } catch (error) {
    authError.textContent = error.message;
    authButton.disabled = false;
  }
});




