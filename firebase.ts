// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkru10jvhseJ7zqubafV4lXJh7RrHJE5I",
  authDomain: "pool-stats-9031d.firebaseapp.com",
  projectId: "pool-stats-9031d",
  storageBucket: "pool-stats-9031d.firebasestorage.app",
  messagingSenderId: "1098354200455",
  appId: "1:1098354200455:web:3618829a219f1f5d9b0d22",
  measurementId: "G-NW52CDTMF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
