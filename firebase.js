// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrTC7g0rTBr1nqn98izUu8dMLnslSUJHw",
  authDomain: "software-design-analysis.firebaseapp.com",
  projectId: "software-design-analysis",
  storageBucket: "software-design-analysis.appspot.com",
  messagingSenderId: "677772240781",
  appId: "1:677772240781:web:cdf59bea0e6ed7abb2ffc4",
  measurementId: "G-4MDWGEY6NP"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);