// components/PersonForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const PersonForm = ({ initialValues, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialValues.name || '');
  const [gender, setGender] = useState(initialValues.gender || 'male');
  const [email, setEmail] = useState(initialValues.email || '');

  const handleSubmit = () => {
    onSubmit({
      name,
      gender,
      email
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
      />

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onCancel} color="gray" />
        <Button title="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default PersonForm;