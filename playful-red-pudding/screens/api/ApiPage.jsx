import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ApiPage() {
  return (
    <View style={styles.container}>
      <Text>Esta es la página de API (vacía de momento).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});