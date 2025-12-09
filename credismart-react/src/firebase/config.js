// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"; "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHcoQlmmZLujk4anndY0_IH6kwC2z0dzk",
  authDomain: "creditsmart-f6d1e.firebaseapp.com",
  projectId: "creditsmart-f6d1e",
  storageBucket: "creditsmart-f6d1e.firebasestorage.app",
  messagingSenderId: "985612864880",
  appId: "1:985612864880:web:3750d78df86ae702bb13b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);