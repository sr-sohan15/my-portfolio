import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLkx_QSHmlitY4Am04STvSjBWKs7jLg64",
  authDomain: "my-portfolio-app-e4564.firebaseapp.com",
  projectId: "my-portfolio-app-e4564",
  storageBucket: "my-portfolio-app-e4564.firebasestorage.app",
  messagingSenderId: "871793131658",
  appId: "1:871793131658:web:648a3258ad4602936bed73",
  measurementId: "G-XFVGL25PWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export
export const db = getFirestore(app);