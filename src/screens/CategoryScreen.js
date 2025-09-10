import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, FlatList, StyleSheet } from 'react-native';
import { fetchMealsByCategory } from '../services/api';
import MealCard from '../components/MealCard';
import { colors } from '../styles/theme';

export default function CategoryScreen({ route, navigation }) {
  const category = route.params?.category;
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setError('');
        setLoading(true);
        const data = await fetchMealsByCategory(category);
        setMeals(data);
      } catch (e) {
        setError('No se pudieron cargar las recetas.');
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error)   return <View style={styles.center}><Text>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
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
