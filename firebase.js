// Import the functions you need from the SDKs you need
import { app, initializeApp , apps} from "firebase/app";
import { initializeFirestore  } from "firebase/firestore"
import { getAuth} from "firebase/auth";
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

initializeApp(firebaseConfig);


export const auth = getAuth();
export const storage = getStorage();