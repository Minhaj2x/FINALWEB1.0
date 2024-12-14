import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { initializeFirestore, persistentLocalCache } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwWmDYreuIQ2OV42RXKvT2pRU1pkcWdZQ",
    authDomain: "workout-85d20.firebaseapp.com",
    projectId: "workout-85d20",
    storageBucket: "workout-85d20.appspot.com",
    messagingSenderId: "341668703819",
    appId: "1:341668703819:web:0861b05afcc7ac306aa7ce",
    measurementId: "G-2QQV5TN75X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistent cache
const db = initializeFirestore(app, {
    localCache: persistentLocalCache()
});

const auth = getAuth(app);

// Export the initialized services for use in other modules
export { db, auth };
