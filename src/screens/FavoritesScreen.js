import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '../store/favorites';
import MealCard from '../components/MealCard';
import { colors } from '../styles/theme';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.muted }}>Aún no tienes favoritos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetail', { mealId: item.idMeal })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
