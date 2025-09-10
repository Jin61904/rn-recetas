import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, size }) => {
          let name = 'home';
          if (route.name === 'Inicio') name = focused ? 'home' : 'home-outline';
          if (route.name === 'Buscar') name = focused ? 'search' : 'search-outline';
          if (route.name === 'Favoritos') name = focused ? 'heart' : 'heart-outline';
          return <Ionicons name={name} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Buscar" component={SearchScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
