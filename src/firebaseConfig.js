// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7tmBWZw16xvi3f5VnfV5eUFoeyi7vNCQ',
  authDomain: 'vue3-firebase-d6b76.firebaseapp.com',
  projectId: 'vue3-firebase-d6b76',
  storageBucket: 'vue3-firebase-d6b76.appspot.com',
  messagingSenderId: '683088512616',
  appId: '1:683088512616:web:54dd4f0757366ac2645ddd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };
