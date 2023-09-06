// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBvxR-W4dIOUObhcss1eJLme2vyjJK7nPY',
  authDomain: 'journal-app-react-f02e4.firebaseapp.com',
  projectId: 'journal-app-react-f02e4',
  storageBucket: 'journal-app-react-f02e4.appspot.com',
  messagingSenderId: '1061312354678',
  appId: '1:1061312354678:web:9813f0f23e79f10657c257',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
