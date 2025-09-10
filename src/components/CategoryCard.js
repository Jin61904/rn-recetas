import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: category.strCategoryThumb }} style={styles.img} />
      <View style={styles.footer}>
        <Text style={styles.title}>{category.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    margin: 8,
    width: '46%',
    elevation: 2,
  },
  img: { width: '100%', height: 110 },
  footer: { padding: 8 },
  title: { fontWeight: '600', textAlign: 'center' },
});
