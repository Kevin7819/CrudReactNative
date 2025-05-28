// app/services/firebase.ts
import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    initializeFirestore,
    updateDoc,
} from 'firebase/firestore';

import {
    API_KEY,
    APP_ID,
    AUTH_DOMAIN,
    MEASUREMENT_ID,
    MESSAGING_SENDER_ID,
    PROJECT_ID,
    STORAGE_BUCKET
} from '@env';

const firebaseConfig = {
  apiKey:            API_KEY,
  authDomain:        AUTH_DOMAIN,
  projectId:         PROJECT_ID,
  storageBucket:     STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId:             APP_ID,
  measurementId:     MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Usamos initializeFirestore para forzar long-polling y evitar errores de WebChannel
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

// Si quieres usar el emulador en desarrollo:
// if (__DEV__) {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

// Referencia a la colección “persons”
const personCol = collection(db, 'persons');

export const createPerson = (data: { name: string; lastname: string }) =>
  addDoc(personCol, data);

export const getPersons = async () => {
  const snap = await getDocs(personCol);
  return snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
};

export const updatePerson = (id: string, data: Partial<{ name: string; lastname: string }>) =>
  updateDoc(doc(db, 'persons', id), data);

export const deletePerson = (id: string) =>
  deleteDoc(doc(db, 'persons', id));
