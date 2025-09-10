import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function MealCard({ meal, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.img} />
      <View style={styles.footer}>
        <Text numberOfLines={2} style={styles.title}>{meal.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    elevation: 2,
  },
  img: { width: '100%', height: 180 },
  footer: { padding: 10 },
  title: { fontWeight: '600' },
});
