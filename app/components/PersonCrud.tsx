// app/components/PersonCrud.tsx

import { Person } from 'hooks/usePersonCrud';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';

type Props = {
  list: Person[];
  name: string;
  lastname: string;
  editing: boolean;
  setName: (v: string) => void;
  setLastname: (v: string) => void;
  onSave: () => Promise<void>;
  onEdit: (p: Person) => void;
  onDelete: (id: string) => Promise<void>;
};

/**
 * Muestra un toast en Android o una alerta en iOS/web
 */
function showMessage(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('', message);
  }
}

export function PersonCrud({
  list,
  name,
  lastname,
  editing,
  setName,
  setLastname,
  onSave,
  onEdit,
  onDelete
}: Props) {
  const [loading, setLoading] = useState(false);

  /**
   * Guarda (crear o actualizar) y muestra feedback
   */
  async function handleSave() {
    setLoading(true);
    try {
      await onSave();
      showMessage(editing ? 'Actualizado correctamente' : 'Creado correctamente');
    } catch (e) {
      console.error(e);
      showMessage('Error al guardar');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Pregunta confirmación antes de eliminar,
   * luego elimina y muestra feedback
   */
  function confirmDelete(id: string) {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este registro?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí',
          onPress: async () => {
            setLoading(true);
            try {
              await onDelete(id);
              showMessage('Eliminado correctamente');
            } catch (e) {
              console.error(e);
              showMessage('Error al eliminar');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  }

  /**
   * Renderiza cada persona en forma de "card"
   */
  const renderItem = ({ item }: { item: Person }) => (
    <View style={styles.card}>
      <Text style={styles.personName}>
        {item.name} {item.lastname}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.edit]}
          onPress={() => onEdit(item)}
          disabled={loading}
        >
          <Text style={styles.txt}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.del]}
          onPress={() => confirmDelete(item.id)}
          disabled={loading}
        >
          <Text style={styles.txt}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Personas</Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#6B7280"
        value={name}
        onChangeText={setName}
        style={styles.input}
        editable={!loading}
      />
      <TextInput
        placeholder="Apellido"
        placeholderTextColor="#6B7280"
        value={lastname}
        onChangeText={setLastname}
        style={styles.input}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.saveBtn, loading && styles.disabledBtn]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.saveTxt}>
          {editing ? 'Actualizar' : 'Crear'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827'
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827'          // color del texto en iOS/Android
  },
  saveBtn: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16
  },
  disabledBtn: {
    backgroundColor: '#A5B4FC'
  },
  saveTxt: {
    color: '#FFF',
    fontWeight: '600'
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1
  },
  personName: {
    fontSize: 16,
    color: '#1F2937'
  },
  actions: {
    flexDirection: 'row'
  },
  btn: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 8
  },
  edit: {
    backgroundColor: '#FBBF24'
  },
  del: {
    backgroundColor: '#EF4444'
  },
  txt: {
    color: '#FFF'
  }
});
