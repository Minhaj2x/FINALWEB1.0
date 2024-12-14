// js/auth.js
import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Function to log in a user
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in as:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error; // Rethrow the error for handling in other parts of the app
  }
}

// Function to log out a user
async function logout() {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Sign-out error:", error.message);
    throw error; // Rethrow the error for handling in other parts of the app
  }
}

// Export functions for use in other parts of the app
export { login, logout };
