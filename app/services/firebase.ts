// We import the function to initialize the Firebase app
import { initializeApp } from 'firebase/app';

// We import the necessary Firestore functions to create, read, update and delete documents.
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  initializeFirestore,
  updateDoc,
} from 'firebase/firestore';

// We import the environment variables defined in .env using react-native-dotenv
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET
} from '@env';

// Firebase configuration with the credentials obtained from the environment variables
const firebaseConfig = {
  apiKey:            API_KEY,
  authDomain:        AUTH_DOMAIN,
  projectId:         PROJECT_ID,
  storageBucket:     STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId:             APP_ID,
  measurementId:     MEASUREMENT_ID,
};

// Initialize the Firebase app with our configuration
const app = initializeApp(firebaseConfig);

// We initialize Firestore (the database) using long-polling to avoid connection problems in mobile environments.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});


// Reference to the “persons” collection
const personCol = collection(db, 'persons');


// Function to create a new person in the collection “persons”.
export const createPerson = (data: { name: string; lastname: string }) =>
  addDoc(personCol, data);

// Asynchronous function to get all persons in the collection “persons”.
export const getPersons = async () => {
  const snap = await getDocs(personCol);
  return snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
};

// Function to update the data of an existing person.
export const updatePerson = (id: string, data: Partial<{ name: string; lastname: string }>) =>
  updateDoc(doc(db, 'persons', id), data);

// Function to remove a person from the “persons” collection.
export const deletePerson = (id: string) =>
  deleteDoc(doc(db, 'persons', id));
