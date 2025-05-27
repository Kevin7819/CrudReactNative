import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { getPersons, deletePerson } from "../services/firebase";


export default function HomeScreen({ navigation }) { 
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPersons();
      setPersons(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      await deletePerson(id);
      setPersons(prev => prev.filter(person => person.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card} testID={`person-card-${item.id}`}>
      <Text style={styles.name} testID={`person-name-${item.id}`}>{item.name}</Text>
      <Text style={styles.email} testID={`person-email-${item.id}`}>{item.email}</Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => handleDelete(item.id)}
        testID={`delete-button-${item.id}`}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer} testID="loading-indicator">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer} testID="error-message">
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="home-screen">
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("create")} // Usar navigation.navigate
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
        ListEmptyComponent={
          <Text style={styles.emptyText} testID="empty-list-message">
            No hay personas registradas
          </Text>
        }
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
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 16
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  }
});
