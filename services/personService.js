// import axios from 'axios';

// const API_URL = 'https://683a084f43bb370a8671a336.mockapi.io/persona/persona';

// export const getPeople = () => axios.get(API_URL);
// export const getPersonById = (id) => axios.get(`${API_URL}/${id}`);
// export const createPerson = (person) => axios.post(API_URL, person);
// export const updatePerson = (id, person) => axios.put(`${API_URL}/${id}`, person);
// export const deletePerson = (id) => axios.delete(`${API_URL}/${id}`);
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../config";

const PERSON_COLLECTION = "personas";

export const createPerson = async (person) => {
  await addDoc(collection(database, PERSON_COLLECTION), person);
};

export const getPeople = async () => {
  const snapshot = await getDocs(collection(database, PERSON_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updatePerson = async (id, data) => {
  const personRef = doc(database, PERSON_COLLECTION, id);
  await updateDoc(personRef, data);
};

export const deletePerson = async (id) => {
  const personRef = doc(database, PERSON_COLLECTION, id);
  await deleteDoc(personRef);
};
