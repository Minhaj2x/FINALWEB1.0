Workout Generator

Project Overview

The Workout Generator is a Progressive Web App (PWA) designed to help users create personalized workout plans. It leverages Firebase and IndexedDB for online and offline functionality, ensuring that users can manage their workouts seamlessly, whether they are connected to the internet or not.

Target Audience

This app is designed for fitness enthusiasts and individuals seeking a simple, accessible tool to manage their fitness routines, regardless of their fitness level or goals.

Features

User Authentication
Secure sign-in and sign-out using Firebase Authentication.
User-specific data management ensures workouts are tied to authenticated accounts.
Login Credentials for accessing the app:
Email: msahmed@mail.fhsu.edu
Password: Minhajahmed123
Offline Functionality
Fully functional offline mode using IndexedDB and service worker caching.
Data syncs to Firebase automatically when the app goes online.
Responsive Design
Mobile-first layout with responsive features implemented using Materialize CSS.
Push Notifications (Optional)
Notify users about new workouts or updates using Firebase Cloud Messaging.
Data Synchronization
Ensures consistency between Firebase (online) and IndexedDB (offline).
Personalized Workout Plans
Users can generate and manage workouts tailored to their fitness goals and levels.

Technical Implementation

The app is built using the following technologies and frameworks:

Firebase Services
Authentication, Firestore, and Messaging.
IndexedDB
Offline data storage and synchronization with Firebase.
Service Worker
Caches assets and handles offline functionality.
Manifest.json
Enables app installation as a PWA with custom icons and splash screens.
Materialize CSS
Provides responsive and visually appealing UI components.
JavaScript
Implements core functionality, including workout management and data syncing.
Challenges and Solutions

Challenge: Ensuring seamless synchronization between Firebase and IndexedDB.
Solution: Implemented robust sync logic to handle data conflicts and unique IDs.
Challenge: Managing offline functionality.
Solution: Combined IndexedDB and service worker caching to ensure full offline support.
Challenge: Providing a user-friendly installation prompt.
Solution: Customized prompts and service worker registration flow to enhance user experience.
Lessons Learned

Mastery of PWA technologies, including IndexedDB and service workers.
Effective use of Firebase for authentication and real-time database management.
Building modular, scalable JavaScript code for modern web applications.
Future Expansion

Enhanced Notifications:
Implement reminders for workout sessions or inactivity.
Social Features:
Allow users to share workouts or compete with friends.
Analytics:
Provide insights into workout progress and habits.
Installation and Usage

Requirements
A modern browser with PWA support (e.g., Chrome, Firefox).
Setup
Clone the repository:
git clone https://github.com/Minhaj2x/FINALWEB1.0.git
Navigate to the project directory:
cd FINALWEB1.0
Install dependencies:
npm install
Start the local development server:
npm start
Deploy to Firebase Hosting:
firebase deploy
Deployment

The app is hosted on Firebase Hosting. Access the live app using the following URL:

Live App Link

File Structure

.
├── index.html                # Main HTML file
├── manifest.json             # PWA configuration
├── css/
│   └── style.css             # Custom styles for the app
├── images/
│   ├── cardio.jpg            # Cardio workout image
│   ├── flexibility.jpg       # Flexibility workout image
│   ├── strength-training.jpg # Strength training workout image
│   ├── fitness.png           # App logo
├── js/
│   ├── auth.js               # Handles user authentication
│   ├── firebaseConfig.js     # Firebase configuration
│   ├── script.js             # Main app logic
│   ├── indexedDB.js          # IndexedDB operations
├── service-worker.js         # Service worker for offline functionality
License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Firebase for backend services.
Materialize CSS for responsive UI components.
