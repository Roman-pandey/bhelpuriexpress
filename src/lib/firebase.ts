import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator
} from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator
} from "firebase/firestore";

// Your Firebase config (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyAeeJi6hQd0yDuQmESC0bHjvmf68UxlWDo",
  authDomain: "bhelpuriexpress.firebaseapp.com",
  projectId: "bhelpuriexpress",
  storageBucket: "bhelpuriexpress.firebasestorage.app",
  messagingSenderId: "206669969355",
  appId: "1:206669969355:web:c3190610cb583af1f8684e",
  measurementId: "G-K6DG4JVLDK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// // ✅ Connect to local emulators in development only
// if (import.meta.env.DEV) {
//   try {
//     connectAuthEmulator(auth, "http://127.0.0.1:9099");
//     connectFirestoreEmulator(db, "127.0.0.1", 8085);
//     console.log("✅ Connected to Firebase Emulators (Auth + Firestore)");
//   } catch (error) {
//     console.warn("⚠️ Emulator connection failed:", error);
//   }
// }

export default app;
