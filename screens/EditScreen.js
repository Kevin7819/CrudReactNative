import React from "react";
import { View } from "react-native";
import PersonForm from "../components/PersonForm";
import { createPerson, updatePerson } from "../services/personService";

export default function EditScreen({ navigation, route }) {
  const person = route.params?.person;

  const handleSubmit = async (data) => {
    if (person) {
      await updatePerson(person.id, data);
    } else {
      await createPerson(data);
    }
    navigation.goBack();
  };

  return (
    <View>
      <PersonForm initialData={person} onSubmit={handleSubmit} />
    </View>
  );
}
