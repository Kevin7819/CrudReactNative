import { useEffect, useState } from 'react';
import {
  createPerson,
  deletePerson,
  getPersons,
  updatePerson
} from '../app/services/firebase';

// We define the Person data type, which represents what each person object looks like in our application
export type Person = { id: string; name: string; lastname: string };

export function usePersonCrud() {
  
  const [list, setList] = useState<Person[]>([]); //list the persons
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null); //id of the person being edited or null if not being edited

 
  useEffect(() => {
    fetchList();
  }, []);

    //function to get the list of people from Firebase
  async function fetchList() {
    const persons = await getPersons();
    setList(persons);
  }

//function to save a person, either by creating a new one or updating an existing one
  async function onSave() {
    if (!name.trim() || !lastname.trim()) return; // Simple validation to avoid empty fields
    if (editingId) {
      await updatePerson(editingId, { name, lastname });
      setEditingId(null);
    } else {
      await createPerson({ name, lastname });
    }
    setName(''); // Clear fields after saving
    setLastname('');
    fetchList(); // Reload the list after saving
  }

  function onEdit(p: Person) {
    setName(p.name);
    setLastname(p.lastname);
    setEditingId(p.id);
  }

  async function onDelete(id: string) {
    await deletePerson(id);
    fetchList();
  }

   // Return all variables and functions that the component will consume.
  return {
    list,
    name,
    lastname,
    editing: !!editingId,
    setName,
    setLastname,
    onSave,
    onEdit,
    onDelete
  };
}
