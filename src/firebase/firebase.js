import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCOK1UfVMHmo_4C6sHi0FoXd1qMAnIqR0E",
  authDomain: "get-social-dae14.firebaseapp.com",
  projectId: "get-social-dae14",
  storageBucket: "get-social-dae14.appspot.com",
  messagingSenderId: "526932971644",
  appId: "1:526932971644:web:a158c807e102898a12f9f9",
  measurementId: "G-Q2RLEM0WHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);