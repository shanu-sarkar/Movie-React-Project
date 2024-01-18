import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDcTOENRivVB3uz0zznXBo8wwoHTMxzkEw",
  authDomain: "movieszone-c2f56.firebaseapp.com",
  projectId: "movieszone-c2f56",
  storageBucket: "movieszone-c2f56.appspot.com",
  messagingSenderId: "680763994453",
  appId: "1:680763994453:web:3fa8bebcf2a1c503a8ffdc"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const userRef = collection(db, "users");

export default app; 
