import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBrQLY6fOrCWANAKvqTBY7P66IEqICcLxc",
  authDomain: "social-media-app-83e66.firebaseapp.com",
  projectId: "social-media-app-83e66",
  storageBucket: "social-media-app-83e66.appspot.com",
  messagingSenderId: "354089986851",
  appId: "1:354089986851:web:1a6c78805fde8d6e1e7a96",
  measurementId: "G-5EBTSBQMJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);