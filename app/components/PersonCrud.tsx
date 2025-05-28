// app/components/PersonCrud.tsx
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import {
    createPerson,
    deletePerson,
    getPersons,
    updatePerson
} from '../services/firebase';

type Person = { id: string; name: string; lastname: string };

export default function PersonCrud() {
  const [list, setList] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const persons = await getPersons();
    setList(persons);
  };

  const onSave = async () => {
    if (!name || !lastname) return;
    if (editingId) {
      await updatePerson(editingId, { name, lastname });
      setEditingId(null);
    } else {
      await createPerson({ name, lastname });
    }
    setName('');
    setLastname('');
    fetchList();
  };

  const onEdit = (p: Person) => {
    setName(p.name);
    setLastname(p.lastname);
    setEditingId(p.id);
  };

  const onDelete = async (id: string) => {
    await deletePerson(id);
    fetchList();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD Personas</Text>

      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={lastname}
        onChangeText={setLastname}
        style={styles.input}
      />
      <Button title={editingId ? "Actualizar" : "Crear"} onPress={onSave} />

      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name} {item.lastname}</Text>
            <View style={styles.buttons}>
              <Button title="✏️" onPress={() => onEdit(item)} />
              <Button title="🗑️" onPress={() => onDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  // fondo blanco
    padding: 16
  },
  title: {
    fontSize: 20,
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    padding: 8,
    borderRadius: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  buttons: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between'
  }
});
