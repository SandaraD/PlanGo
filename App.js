import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import ViewTaskScreen from './src/screens/ViewTaskScreen';
import EditTaskScreen from './src/screens/UpdateTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
    <Stack.Screen name="ViewTask" component={ViewTaskScreen} options={{ title: 'View Task' }} />
    <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task '}} />
  </Stack.Navigator>
</NavigationContainer>

  );
}
