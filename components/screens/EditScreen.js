import React, { useState, useEffect } from "react";
import {
  View, TextInput, Alert, Text, Platform, StyleSheet, ScrollView, TouchableOpacity
} from "react-native";
import { updatePerson } from "../services/firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EditScreen({ route, navigation }) {
  const { person } = route.params;
  const [name, setName] = useState(person.name);
  const [email, setEmail] = useState(person.email);
  const [gender, setGender] = useState(person.gender || "");
  const [birthDate, setBirthDate] = useState(new Date(person.birthDate));
  const [showPicker, setShowPicker] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const handleUpdate = async () => {
    if (!name || !email || !gender || !birthDate) {
      Alert.alert("Por favor completa todos los campos.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Correo electrónico inválido.");
      return;
    }

    await updatePerson(person.id, {
      name,
      email,
      gender,
      birthDate: birthDate.toISOString()
    });

    Alert.alert("Persona actualizada con éxito");
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

      <View style={styles.centered}>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowPicker(true)}>
          <Icon name="calendar" size={24} color="#007BFF" style={{ marginRight: 8 }} />
          <Text style={styles.datePickerText}>Editar fecha de nacimiento</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setBirthDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.selectedDate}>
        {`Fecha seleccionada: ${birthDate.toLocaleDateString()}`}
      </Text>

      <Text style={styles.label}>Género</Text>
      <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
        <Picker.Item label="Selecciona un género" value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      <View style={styles.centered}>
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.saveButtonText}>Actualizar Persona</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  selectedDate: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    height: 60,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "600",
  },
  centered: {
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
