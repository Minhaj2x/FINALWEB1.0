import { auth } from './firebaseConfig.js';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { login, logout } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded and initializing app...");

    // References to UI elements
    const authSection = document.getElementById('auth-section');
    const mainSection = document.getElementById('main-section');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Check if it's the first app open in the current session
    const firstOpen = !localStorage.getItem('firstOpen');
    if (firstOpen) {
        console.log("First app open detected. Forcing login.");
        localStorage.setItem('firstOpen', 'true'); // Mark that the app has been opened
        auth.signOut().catch(console.error); // Force logout on first app open
    }

    // Function to update UI based on authentication state
    function updateUIBasedOnAuthState(user) {
        if (user) {
            console.log("User signed in: Hiding login page, showing main section.");
            authSection.style.display = "none"; // Hide login page
            mainSection.style.display = "block"; // Show main section
        } else {
            console.log("No user signed in: Showing login page, hiding main section.");
            authSection.style.display = "block"; // Ensure login page is visible
            mainSection.style.display = "none"; // Ensure main section is hidden
        }
    }

    // Set Firebase Auth Persistence
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            console.log("Auth persistence set to local.");

            // Monitor Authentication State
            onAuthStateChanged(auth, (user) => {
                console.log("onAuthStateChanged fired.");
                updateUIBasedOnAuthState(user);
            });
        })
        .catch((error) => {
            console.error("Error setting persistence:", error.message);
        });

    // Handle Login Form Submission
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("Login attempt:", email);

        try {
            await login(email, password);
            console.log("Login successful!");
            alert("Login successful!");
        } catch (error) {
            console.error("Login failed:", error.message);
            alert(`Login failed: ${error.message}`);
        }
    });

    // Handle Logout
    logoutBtn.addEventListener("click", async () => {
        console.log("Logout attempt...");
        try {
            await logout();
            alert("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error.message);
            alert(`Logout failed: ${error.message}`);
        }
    });

    console.log("App initialization complete.");
});
