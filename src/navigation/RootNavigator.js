import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import CategoryScreen from '../screens/CategoryScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={({ route }) => ({ title: route.params?.category || 'Categoría' })}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ title: 'Detalle de receta' }}
      />
    </Stack.Navigator>
  );
}
