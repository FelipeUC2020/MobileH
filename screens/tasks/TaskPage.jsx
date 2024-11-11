import { SafeAreaView, ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native';
import HabitCard from '../../components/HabitCard';
import { useState, useEffect, useRef } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {
    const [time, setTime] = useState(0);
    const [tasks, setTasks] = useState(["Hábito 1", "Hábito 2", "Hábito 3", "Hábito 4", 
    "Hábito 5", "Hábito 6", "Hábito 7", "Hábito 8", "Hábito 9", "Hábito 10", "Hábito 11"])
    const [taskInput, setTaskInput] = useState("");
    const swipeableRefs = useRef([]);

    function handleHabitDeletion(index) {
        setTasks((prev) => {
          let newtasks=[...prev]
          newtasks = newtasks.filter((item, idx) => idx != index);
          // cerrar el swipable
          swipeableRefs.current[index]?.close();
          return newtasks;
        })
    }

    function handleHabitCreate(habit){
      if (tasks.includes(habit)){
        alert('El hábito está repetido');
        return;
      }

      setTasks((prev) => {
        if (habit.trim()) {
          return [... prev, habit];
        }

        alert('El campo no puede estar vacío');
        return [...prev];
      })
      setTaskInput('');
      Keyboard.dismiss()
    }

    const renderRightActions = (index) => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleHabitDeletion(index)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    );

    useEffect(() => {
      setTimeout(() => {setTime(time + 1)}, 1000)
    }, [time])



    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Cantidad de tiempo que ha transcurrido: {time}</Text>
        <View style={styles.inputView}>
          <TextInput 
            style={{height: 50, width: 200}}
            label="Task"
            value={taskInput}
            onChangeText={text => setTaskInput(text)}
          />
          <Button onPress={() => {handleHabitCreate(taskInput)}} style={{ backgroundColor: 'purple', justifyContent: 'center' }} color={'white'}>
            Crear
          </Button>
        </View>
        <ScrollView style={{'height': 600}}>
          <View style={styles.taskView}>
            {tasks.map((task, index) => (
              <Swipeable
                renderRightActions={() => renderRightActions(index)}
                onSwipeableOpen={() => handleHabitDeletion(index)}
                ref={(ref) => (swipeableRefs.current[index] = ref)}
                key={index}
              >
                <HabitCard name={task} onDelete={() => handleHabitDeletion(index)} />
              </Swipeable>
            ))}
          </View>
        </ScrollView>

        {/*<Text>
          {data ? JSON.stringify(data) : "Loading..."}
        </Text>*/}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    title: {
      flex: 1, 
      paddingHorizontal: 20,
      paddingVertical: 5,
      fontSize: 20,
      alignSelf: 'left', 
      marginTop: 30
    },
    inputView: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      gap: 10
    },
    taskView : {
      paddingHorizontal: 10
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '82%',
      borderRadius: 8,
      paddingHorizontal:70
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});

