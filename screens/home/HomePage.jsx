import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function HomePage({ navigation, toggleTheme }) {
  const [name, setName] = useState('');
  const theme = useTheme();

  const handleStart = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Por favor ingrese un nombre');
    } else {
      navigation.navigate('Landing', { name });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Hola</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.placeholder }]}
        placeholder="Ingresa tu nombre"
        placeholderTextColor={theme.colors.placeholder}
        value={name}
        onChangeText={setName}
      />
      <Button mode="contained" onPress={handleStart} style={styles.button}>
        Iniciar
      </Button>
      <Button mode="outlined" onPress={toggleTheme} style={styles.button}>
        Cambiar Tema
      </Button>
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
  button: {
    marginTop: 8,
  },
});
