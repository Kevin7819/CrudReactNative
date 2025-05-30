import React, { useEffect, useState } from "react";
import { View, ScrollView, Button, StyleSheet } from "react-native";
import { getPeople, deletePerson } from "../services/personService";
import PersonItem from "../components/PersonItem";

export default function HomeScreen({ navigation }) {
  const [people, setPeople] = useState([]);

  const fetchData = () => {
    getPeople().then(setPeople);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        title="Add Person"
        onPress={() => navigation.navigate("EditScreen")}
      />
      <ScrollView style={styles.scroll}>
        {people.map((p) => (
          <PersonItem
            key={p.id}
            person={p}
            onEdit={(person) => navigation.navigate("EditScreen", { person })}
            onDelete={(id) => {
              deletePerson(id).then(fetchData);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scroll: {
    marginTop: 10,
  },
});
