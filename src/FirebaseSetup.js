// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACYQbWGcep1HRmDL3wd-Pj7ew4YaeNU9k",
  authDomain: "sea-salon-2807d.firebaseapp.com",
  projectId: "sea-salon-2807d",
  storageBucket: "sea-salon-2807d.appspot.com",
  messagingSenderId: "13809612348",
  appId: "1:13809612348:web:ffe8f88a8c1545a5fd7539",
  measurementId: "G-JLC7TGGCQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app, collection, addDoc };