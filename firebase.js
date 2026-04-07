import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBahszO3wnyhuRuMWYbU8Z7PxN-ZIAu6Ww",
  authDomain: "amanelectronics-c6658.firebaseapp.com",
  projectId: "amanelectronics-c6658",
  storageBucket: "amanelectronics-c6658.firebasestorage.app",
  messagingSenderId: "393793875214",
  appId: "1:393793875214:web:a14f03dc57e95bfa8cbb5f",
  measurementId: "G-NXB3P5SVBX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);