let db;

// Initialize IndexedDB
const request = indexedDB.open("WorkoutAppDB", 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;

    if (!db.objectStoreNames.contains("workouts")) {
        db.createObjectStore("workouts", { keyPath: "id", autoIncrement: true });
        console.log("Created 'workouts' object store.");
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexedDB initialized successfully:", db);
};

request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.errorCode);
};

// Save a workout to IndexedDB
function saveWorkoutOffline(workout) {
    if (!db) {
        console.error("IndexedDB is not initialized.");
        return;
    }

    const transaction = db.transaction("workouts", "readwrite");
    const store = transaction.objectStore("workouts");

    const request = store.add(workout);
    request.onsuccess = () => {
        console.log("Workout successfully added to IndexedDB:", workout);
    };

    request.onerror = (event) => {
        console.error("Error adding workout to IndexedDB:", event.target.error);
    };

    transaction.oncomplete = () => {
        console.log("Transaction completed successfully.");
    };

    transaction.onerror = (event) => {
        console.error("Transaction failed:", event.target.error);
    };
}

// Fetch all workouts from IndexedDB
function getOfflineWorkouts(callback) {
    if (!db) {
        console.error("IndexedDB is not initialized.");
        return;
    }

    const transaction = db.transaction("workouts", "readonly");
    const store = transaction.objectStore("workouts");

    const request = store.getAll();
    request.onsuccess = (event) => {
        callback(event.target.result);
    };

    request.onerror = (event) => {
        console.error("Error fetching workouts from IndexedDB:", event.target.error);
    };
}

// Delete a workout from IndexedDB
function deleteOfflineWorkout(id) {
    if (!db) {
        console.error("IndexedDB is not initialized.");
        return;
    }

    const transaction = db.transaction("workouts", "readwrite");
    const store = transaction.objectStore("workouts");

    const request = store.delete(id);
    request.onsuccess = () => {
        console.log("Workout successfully deleted from IndexedDB:", id);
    };

    request.onerror = (event) => {
        console.error("Error deleting workout from IndexedDB:", event.target.error);
    };
}

export { saveWorkoutOffline, getOfflineWorkouts, deleteOfflineWorkout };
