import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();
const KEY = '@favorites_meals';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // [{idMeal, strMeal, strMealThumb}]

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setFavorites(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  const persist = async (arr) => {
    setFavorites(arr);
    try { await AsyncStorage.setItem(KEY, JSON.stringify(arr)); } catch {}
  };

  const toggleFavorite = useCallback((mealObj) => {
    setFavorites((prev) => {
      const exists = prev.some(m => m.idMeal === mealObj.idMeal);
      const next = exists ? prev.filter(m => m.idMeal !== mealObj.idMeal) : [mealObj, ...prev];
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(()=>{});
      return next;
    });
  }, []);

  const isFavorite = useCallback((idMeal) => favorites.some(m => m.idMeal === idMeal), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
