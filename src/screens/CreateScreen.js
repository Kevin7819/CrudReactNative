import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { addPerson } from "../firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CreateScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    if (!name || !email || !birthDate || !gender) {
      Alert.alert("Por favor completa todos los campos.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Por favor ingresa un correo electrónico válido.");
      return;
    }

    await addPerson({ name, email, birthDate: birthDate.toISOString(), gender });
    Alert.alert("Persona agregada con éxito");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre completo</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <View style={styles.centered}>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowPicker(true)}>
          <Icon name="calendar" size={24} color="#007BFF" style={{ marginRight: 8 }} />
          <Text style={styles.datePickerText}>Seleccionar fecha de nacimiento</Text>
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
        {birthDate ? `Fecha seleccionada: ${birthDate.toLocaleDateString()}` : "No seleccionada"}
      </Text>

      <Text style={styles.label}>Género:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un género" value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      <View style={styles.centered}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Guardar persona</Text>
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
