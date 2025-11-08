import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeeJi6hQd0yDuQmESC0bHjvmf68UxlWDo",
  authDomain: "bhelpuriexpress.firebaseapp.com",
  projectId: "bhelpuriexpress",
  storageBucket: "bhelpuriexpress.firebasestorage.app",
  messagingSenderId: "206669969355",
  appId: "1:206669969355:web:c3190610cb583af1f8684e",
  measurementId: "G-K6DG4JVLDK"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
