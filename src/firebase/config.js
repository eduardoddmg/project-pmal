import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAHEpvltgLXKxXrRy8kZKddDLhMJNt_2Xs",
  authDomain: "project-tco-pmal.firebaseapp.com",
  projectId: "project-tco-pmal",
  storageBucket: "project-tco-pmal.appspot.com",
  messagingSenderId: "945211715865",
  appId: "1:945211715865:web:2ad92327775fc89ee1d588",
  measurementId: "G-HW3XE2Z9FG",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
