import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function PersonForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    lastname: initialData.lastname || "",
    phone: initialData.phone || "",
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={form.lastname}
        onChangeText={(text) => setForm({ ...form, lastname: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Button title="Save" onPress={() => onSubmit(form)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});
