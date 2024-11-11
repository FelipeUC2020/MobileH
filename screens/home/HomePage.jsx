import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';

export default function HomePage({ navigation }) {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Por favor ingrese un nombre');
    } else {
      navigation.navigate('Landing', { name });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
        value={name}
        onChangeText={setName}
      />
      <Button title="Iniciar" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    width: '80%',
    marginBottom: 16,
  },
});
