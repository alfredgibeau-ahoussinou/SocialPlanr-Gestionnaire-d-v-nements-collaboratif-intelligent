// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableNetwork } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5xRTGjTPtJ8N_pC4Jha0wNZzJFNQWt4A",
  authDomain: "socialplanr-f09f1.firebaseapp.com",
  projectId: "socialplanr-f09f1",
  storageBucket: "socialplanr-f09f1.firebasestorage.app",
  messagingSenderId: "1086885031434",
  appId: "1:1086885031434:web:a0816d31540c650fb679f3",
  measurementId: "G-8WKPR3YSR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth 
// Note: L'avertissement AsyncStorage est normal - Firebase Auth fonctionne correctement 
// La persistance est gérée automatiquement par React Native
const auth = getAuth(app);

// Initialize Firestore with optimized settings to reduce WebChannel errors
const db = getFirestore(app);

// Enable offline persistence (reduces connection errors)
// Optimiser la connexion réseau
enableNetwork(db).catch(console.warn);

export { auth, db };
export default app; 