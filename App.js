import * as React from 'react';

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Button
} from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {useColorScheme} from 'react-native';

import HomePage from './screens/home/HomePage.jsx'
import LandingPage from './screens/landing_page/LandingPage.jsx'
import ApiPage from './screens/api/ApiPage.jsx'
import TaskPage from './screens/tasks/TaskPage.jsx'
import ConfigPage from './screens/config/ConfigPage.jsx'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs({ route, toggleTheme }) {
  const {name} = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Landing') {
            iconName = 'home';
          } else if (route.name === 'ApiPage') {
            iconName = 'cloud';
          } else if (route.name === 'TaskPage') {
            iconName = 'file';
          } else if (route.name === 'ConfigPage') {
            iconName = 'cog'
          }

          // Retorna el icono para cada pantalla
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Landing"
        options={{ title: 'Inicio', headerShown: false }}
      >
        {() => <LandingPage name={name} />}
      </Tab.Screen>
      <Tab.Screen
        name="ApiPage"
        component={ApiPage}
        options={{ title: 'API' }}
      />
      <Tab.Screen
        name="TaskPage"
        component={TaskPage}
        options={{ title: `Tasks de ${name}` }}
      />
    <Tab.Screen
        name="ConfigPage"
        options={{ title: 'Configuración' }}
      >
      {() => <ConfigPage toggleTheme={toggleTheme} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const deviceTheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(deviceTheme === 'dark');

  const theme = isDarkTheme ? { ...PaperDarkTheme, ...NavDarkTheme } : { ...PaperDefaultTheme, ...NavDefaultTheme };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ title: 'Bienvenido' }}>
              {(props) => <HomePage {...props} toggleTheme={toggleTheme} />}
            </Stack.Screen>
            <Stack.Screen name="Landing" options={{ headerShown: false }}>
              {(props) => <AppTabs {...props} toggleTheme={toggleTheme} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
