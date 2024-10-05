// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFKM6sVaZ6xxgahp-2dLTV9ayeHa8QLx8",
  authDomain: "trip-planner-e490a.firebaseapp.com",
  projectId: "trip-planner-e490a",
  storageBucket: "trip-planner-e490a.appspot.com",
  messagingSenderId: "921396593958",
  appId: "1:921396593958:web:b6b9ac717f1b572eda6de7",
  measurementId: "G-VXBLBMMQJJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
