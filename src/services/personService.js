// services/personService.js
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const personCollection = collection(db, 'personas');

export const createPerson = async (person) => {
  try {
    await addDoc(personCollection, person);
  } catch (error) {
    console.error("Error creating person: ", error);
    throw error;
  }
};

export const getPeople = async () => {
  try {
    const querySnapshot = await getDocs(personCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching persons: ", error);
    throw error;
  }
};

export const updatePerson = async (id, person) => {
  try {
    await updateDoc(doc(db, 'personas', id), person);
  } catch (error) {
    console.error("Error updating person: ", error);
    throw error;
  }
};

export const deletePerson = async (id) => {
  try {
    await deleteDoc(doc(db, 'personas', id));
  } catch (error) {
    console.error("Error deleting person: ", error);
    throw error;
  }
};