// components/PersonItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PersonItem = ({ person, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{person.name}</Text>
      <Text>Gender: {person.gender}</Text>
      <Text>Email: {person.email}</Text>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => onEdit(person)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default PersonItem;