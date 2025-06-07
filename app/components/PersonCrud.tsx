
import { Person } from 'hooks/usePersonCrud';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform, // Allows us to detect the operating system (iOS, Android, web).
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

// Display a toast on Android or an alert on iOS/web.
function showMessage(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'web') {
    window.alert(message);
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

  //Save (create or update)
  //but first validate that none of the fields are empty.
  async function handleSave() {
    if (!name.trim() || !lastname.trim()) {
      showMessage('Por favor, llena todos los campos antes de guardar.');
      return;
    }

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

  // Extraemos la lógica de borrado para poder llamarla tanto desde web como desde Alert
  async function handleDelete(id: string) {
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

  function confirmDelete(id: string) {
    if (Platform.OS === 'web') {
      // En web usamos el confirm nativo
      if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        handleDelete(id);
      }
    } else {
      // En móvil mostramos la alerta con botones
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que deseas eliminar este registro?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Sí', onPress: () => handleDelete(id) }
        ]
      );
    }
  }

  //Render each person in the form of a “card”.
  const renderItem = ({ item }: { item: Person }) => (
    <View style={styles.card}>
      <Text style={styles.personName}>
        {item.name} {item.lastname}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.edit]}
          onPress={() => onEdit(item)} // When pressed, we invoke onEdit with the Person object
          disabled={loading}
        >
          <Text style={styles.txt}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.del]}
          onPress={() => confirmDelete(item.id)}// When pressed, we ask confirmDelete
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

       {/* Button to create or update */}
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

// Defining styles with StyleSheet
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
    color: '#111827'          // text color in iOS/Android
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
