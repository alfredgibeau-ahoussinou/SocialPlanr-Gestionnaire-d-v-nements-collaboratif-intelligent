// Configuration Firebase pour le web
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase (même que mobile)
const firebaseConfig = {
  apiKey: "AIzaSyD5xRTGjTPtJ8N_pC4Jha0wNZzJFNQWt4A",
  authDomain: "socialplanr-f09f1.firebaseapp.com",
  projectId: "socialplanr-f09f1",
  storageBucket: "socialplanr-f09f1.firebasestorage.app",
  messagingSenderId: "1086885031434",
  appId: "1:1086885031434:web:a0816d31540c650fb679f3",
  measurementId: "G-8WKPR3YSR6"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firebase Auth
const auth = getAuth(app);

// Initialiser Firestore
const db = getFirestore(app);

export { auth, db };
export default app;
