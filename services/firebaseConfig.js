// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx5ABpDysjpibxvOq3t4n5eHcRixIRVl8",
  authDomain: "restaurante-3ac50.firebaseapp.com",
  projectId: "restaurante-3ac50",
  storageBucket: "restaurante-3ac50.appspot.com",
  messagingSenderId: "5477948920",
  appId: "1:5477948920:web:d3da567d84dc9a06dd8a0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)