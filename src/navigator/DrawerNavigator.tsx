import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home';
import QuizScreen from '../screens/Quiz';
import ResultsScreen from '../screens/Result';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false
    }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Quiz" component={QuizScreen} />
      <Drawer.Screen name="Results" component={ResultsScreen} />
    </Drawer.Navigator>
  );
}