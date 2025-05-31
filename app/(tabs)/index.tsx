import { usePersonCrud } from 'hooks/usePersonCrud';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { PersonCrud } from '../components/PersonCrud';

export default function ExploreScreen() {
  //The hook usePersonCrud is called to obtain the CRUD functions.
  const crud = usePersonCrud(); 
  // the crud object is passed to the PersonCrud component
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PersonCrud {...crud} />
    </SafeAreaView>
  );
}
