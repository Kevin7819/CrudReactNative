import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function PersonItem({ person, onDelete, onEdit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{person.name} {person.lastname}</Text>
      <Text style={styles.phone}>📞 {person.phone}</Text>

      <View style={styles.buttonRow}>
        <Button title="Edit" onPress={() => onEdit(person)} />
        <View style={styles.spacer} />
        <Button title="Delete" color="#d9534f" onPress={() => onDelete(person.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  spacer: {
    width: 10,
  },
});
