import { Text, View, StyleSheet, Button } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { useState } from 'react';

// NO TOCAR ESTE ARCHIVO
export default function HabitCard(props) {
    const theme = useTheme();
    const [count, setCount] = useState(0); // Estado para el contador de hábitos, inicialmente 0

    function handleIncrease() { // Añade 1 al contador de hábitos
        setCount((prevCount) => prevCount + 1);
    }

    function handleDecrease() { // Quita 1 al contador de hábitos
        setCount((prevCount) => {
          if (prevCount == 0){
            return 0;
          }
          const newValue = prevCount - 1
          return newValue;
          });
    }

    function handleDelete() { // Llama a la función onDelete del componente padre con el nombre del hábito
        props.onDelete(props.name);
    }

    return (
        <Card style={styles.habitCard}>
            <View style={styles.row}>
                <Text style={[styles.habitName, { color: theme.colors.text }]}>{props.name}</Text>
                <View style={styles.counterContainer}>
                    <Button onPress={handleDecrease} title="-" />
                    <Text style={[styles.counter, { color: theme.colors.text }]}>{count}</Text>
                    <Button onPress={handleIncrease} title="+" />
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    habitCard: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    habitName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
    },
    counter: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
});