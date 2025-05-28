// app/screens/IndexTab.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PersonCrud from '../components/PersonCrud';

export default function IndexTab() {
  return (
    <SafeAreaView style={styles.container}>
      <PersonCrud />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'  // asegura fondo blanco en toda la pantalla
  }
});
