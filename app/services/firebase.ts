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

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey:            "",
  authDomain:        "",
  projectId:         "",
  storageBucket:     "",
  messagingSenderId: "",
  appId:             "",
  measurementId:     ""
};

// Inicializamos la app de Firebase con esa configuración
const app = initializeApp(firebaseConfig);

// Inicializamos Firestore usando longPolling para evitar problemas en móvil
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

// Referencia a la colección “persons”
const personCol = collection(db, 'persons');



// Crea un nuevo  (persona) en “persons”
export const createPerson = (data: { name: string; lastname: string }) =>
  addDoc(personCol, data);

// Obtiene todas las personas
export const getPersons = async () => {
  const snap = await getDocs(personCol);
  return snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
};

// Actualiza existente en “persons”
export const updatePerson = (id: string, data: Partial<{ name: string; lastname: string }>) =>
  updateDoc(doc(db, 'persons', id), data);

// Elimina  de “persons”
export const deletePerson = (id: string) =>
  deleteDoc(doc(db, 'persons', id));
