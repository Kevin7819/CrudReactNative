// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView } from 'react-native';
import PersonForm from './src/components/PersonForm.js';
import PersonItem from './src/components/PersonItem.js';
import { createPerson,updatePerson,getPeople, deletePerson } from './src/services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    try {
      const personsData = await getPeople();
      setPersons(personsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setEditingPerson(null);
    setIsFormVisible(true);
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePerson(id);
      loadPersons();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingPerson) {
        await updatePerson(editingPerson.id, formData);
      } else {
        await createPerson(formData);
      }
      setIsFormVisible(false);
      await loadPersons();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data: " + error.message);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Person CRUD</Text>

      {isFormVisible ? (
        <ScrollView style={styles.formContainer}>
          <PersonForm
            initialValues={editingPerson || {
              name: '',
              gender: 'male',
              email: ''
            }}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </ScrollView>
      ) : (
        <>
          <Button title="Add Person" onPress={handleAdd} />
          <FlatList
            data={persons}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PersonItem
                person={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            )}
            style={styles.list}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },
});

export default App;