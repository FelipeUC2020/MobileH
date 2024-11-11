import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function ConfigPage({ toggleTheme }) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Esta página es solo para cambiar el tema de la aplicación.
      </Text>
      <Button mode="contained" onPress={toggleTheme} style={styles.button}>
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
    padding: 10
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});