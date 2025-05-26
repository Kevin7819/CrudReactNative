import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getPersons, deletePerson } from "../firebase/firestore";

export default function HomeScreen({ navigate }) {
  const [persons, setPersons] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await getPersons();
    setPersons(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    await deletePerson(id);
    setPersons(prev => prev.filter(person => person.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => handleDelete(item.id)}
        testID={`delete-button-${item.id}`}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container} testID="app-container">
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate("create")}
        testID="add-button"
      >
        <Text style={styles.addButtonText}>Agregar Persona</Text>
      </TouchableOpacity>
      <FlatList
        data={persons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        testID="persons-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F4F4"
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  list: {
    paddingBottom: 20
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 6,
    alignItems: "center"
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
