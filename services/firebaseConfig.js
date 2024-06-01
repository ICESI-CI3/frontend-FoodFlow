// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp6MaVedy660xU-AL6M2M4OzYXO9n2ocQ",
  authDomain: "restaurant-app-73425.firebaseapp.com",
  projectId: "restaurant-app-73425",
  storageBucket: "restaurant-app-73425.appspot.com",
  messagingSenderId: "1068200017759",
  appId: "1:1068200017759:web:4f07bc4472dc27498c80ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);