const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`);
  if (!res.ok) throw new Error('Error cargando categorías');
  const data = await res.json();
  return data.categories || [];
}

export async function fetchMealsByCategory(category) {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Error cargando recetas');
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Error cargando detalle');
  const data = await res.json();
  return (data.meals && data.meals[0]) || null;
}

export async function searchMealsByName(query) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Error en búsqueda');
  const data = await res.json();
  return data.meals || [];
}
