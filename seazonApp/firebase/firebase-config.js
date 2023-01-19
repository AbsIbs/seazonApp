// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'
/* import { getAnalytics } from "firebase/analytics"; */
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuedfD9S2tAStZ3MEfufrQIcLSfdK3EBM",
  authDomain: "seazon-app-mvp.firebaseapp.com",
  projectId: "seazon-app-mvp",
  storageBucket: "seazon-app-mvp.appspot.com",
  messagingSenderId: "665935054110",
  appId: "1:665935054110:web:42b266a130261cb2f5f50f",
  measurementId: "G-LEM9ZNJK1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Firestore       
export const db = getFirestore(app);
// Storage
export const storage = getStorage(app);
/* const analytics = getAnalytics(app); */
