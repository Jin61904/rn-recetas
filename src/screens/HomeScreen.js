import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { fetchCategories } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import { colors } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await fetchCategories();
      setCats(data);
    } catch (e) {
      setError('No se pudieron cargar las categorías.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error)   return <View style={styles.center}><Text>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={cats}
        numColumns={2}
        keyExtractor={(item) => item.idCategory}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => navigation.navigate('Category', { category: item.strCategory })}
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
