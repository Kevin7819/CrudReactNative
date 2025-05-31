// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyByPLkZKXX9lzauC0KmRQOKR9uS5AS80Z4",
  authDomain: "crud-productos-universidad.firebaseapp.com",
  projectId: "crud-productos-universidad",
  storageBucket: "crud-productos-universidad.appspot.com",
  messagingSenderId: "1074908985602",
  appId: "1:1074908985602:web:f09192ec3d9fd4da236a1b",
  measurementId: "G-TCQSQGLCX2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
