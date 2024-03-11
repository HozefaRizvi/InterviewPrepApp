// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; 
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDgIlR6hH6WBUsEWfT4tB_e2yKIpaVLJxY",
  authDomain: "semesterproject-1d480.firebaseapp.com",
  projectId: "semesterproject-1d480",
  storageBucket: "semesterproject-1d480.appspot.com",
  messagingSenderId: "217904909829",
  appId: "1:217904909829:web:934930c590c69f697d166c"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app,"gs://semesterproject-1d480.appspot.com");
const auth = getAuth(app);
export { db, storage, auth };