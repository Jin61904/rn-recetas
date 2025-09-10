import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchMealById } from '../services/api';
import { colors } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../store/favorites';

function buildIngredientsList(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const qty = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push(`${qty ? qty : ''} ${ing}`.trim());
  }
  return list;
}

export default function MealDetailScreen({ route }) {
  const mealId = route.params?.mealId;
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState('');
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    (async () => {
      try {
        setError('');
        setLoading(true);
        const m = await fetchMealById(mealId);
        setMeal(m);
      } catch (e) {
        setError('No se pudo cargar el detalle.');
      } finally {
        setLoading(false);
      }
    })();
  }, [mealId]);

  const ing = useMemo(() => (meal ? buildIngredientsList(meal) : []), [meal]);
  const fav = isFavorite(mealId);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error)   return <View style={styles.center}><Text>{error}</Text></View>;
  if (!meal)   return <View style={styles.center}><Text>Receta no encontrada.</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.img} />
      <View style={styles.header}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <TouchableOpacity
          onPress={() => toggleFavorite({ idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb })}
          style={styles.favBtn}
          accessibilityLabel="Toggle favorito"
        >
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} />
        </TouchableOpacity>
      </View>
      <Text style={styles.meta}>
        {meal.strArea ? `${meal.strArea} • ` : ''}{meal.strCategory || ''}
      </Text>

      <Text style={styles.section}>Ingredientes</Text>
      {ing.map((line, idx) => (
        <Text key={idx} style={styles.li}>• {line}</Text>
      ))}

      <Text style={styles.section}>Preparación</Text>
      <Text style={styles.body}>{meal.strInstructions || 'Sin instrucciones.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  img: { width: '100%', height: 240 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, flex: 1, paddingRight: 8 },
  favBtn: { padding: 8, borderRadius: 999, backgroundColor: '#fff' },
  meta: { marginHorizontal: 16, color: colors.muted, marginBottom: 12 },
  section: { marginTop: 10, marginHorizontal: 16, fontSize: 16, fontWeight: '700' },
  li: { marginHorizontal: 16, marginTop: 6, color: colors.text },
  body: { marginHorizontal: 16, marginTop: 8, lineHeight: 22, color: colors.text },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
