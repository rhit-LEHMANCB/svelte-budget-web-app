// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { writable } from "svelte/store";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa_QYbyX6g4XnFisFDyqHsgDGCsRKshCE",
  authDomain: "lehman-realty.firebaseapp.com",
  projectId: "lehman-realty",
  storageBucket: "lehman-realty.appspot.com",
  messagingSenderId: "937362912362",
  appId: "1:937362912362:web:680cfdf7498d8321204613",
  measurementId: "G-4JJL31VJCE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();