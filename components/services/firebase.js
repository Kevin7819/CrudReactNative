// services/firebase.js
import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

const COLLECTION_NAME = "persons";

// Create a new person
export const addPerson = async (person) => {
  await addDoc(collection(db, COLLECTION_NAME), person);
};

// Get all persons
export const getPersons = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete a person by ID
export const deletePerson = async (id) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

// Update a person's data by ID
export const updatePerson = async (id, updatedData) => {
  const personRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(personRef, updatedData);
};
