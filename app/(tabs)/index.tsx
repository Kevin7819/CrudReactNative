import { usePersonCrud } from 'hooks/usePersonCrud';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { PersonCrud } from '../components/PersonCrud';

export default function ExploreScreen() {
  const crud = usePersonCrud();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PersonCrud {...crud} />
    </SafeAreaView>
  );
}
