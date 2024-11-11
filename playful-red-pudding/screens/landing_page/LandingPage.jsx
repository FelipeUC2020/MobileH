import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { Text, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function LandingPage({ name }) {
  const theme = useTheme(); 
  const navigation = useNavigation(); 

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Hola {name}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('OtraScreen')} 
        style={styles.button}
      >
        Ir a Otra Ventana
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
  button: {
    marginTop: 16,
  },
});
