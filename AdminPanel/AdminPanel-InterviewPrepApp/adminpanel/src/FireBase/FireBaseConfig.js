import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDgIlR6hH6WBUsEWfT4tB_e2yKIpaVLJxY",
  authDomain: "semesterproject-1d480.firebaseapp.com",
  projectId: "semesterproject-1d480",
  storageBucket: "semesterproject-1d480.appspot.com",
  messagingSenderId: "217904909829",
  appId: "1:217904909829:web:934930c590c69f697d166c"
};
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db ,getCurrentTimestamp};