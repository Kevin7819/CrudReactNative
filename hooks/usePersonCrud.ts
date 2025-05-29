// app/hooks/usePersonCrud.ts
import { useEffect, useState } from 'react';
import {
    createPerson,
    deletePerson,
    getPersons,
    updatePerson
} from '../app/services/firebase';

export type Person = { id: string; name: string; lastname: string };

export function usePersonCrud() {
  const [list, setList] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    const persons = await getPersons();
    setList(persons);
  }

  async function onSave() {
    if (!name.trim() || !lastname.trim()) return;
    if (editingId) {
      await updatePerson(editingId, { name, lastname });
      setEditingId(null);
    } else {
      await createPerson({ name, lastname });
    }
    setName('');
    setLastname('');
    fetchList();
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
