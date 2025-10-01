import { db } from "../services/configFirebase";
import { ref , push, set, get, child, remove, update } from "firebase/database";


export const crearReceta = async (receta) => {
    console.log("entro")
  const recetasRef = ref(db, "recetas");
  await push(recetasRef, receta);
  
};


export const leerRecetas = async () => {
  const snapshot = await get(child(ref(db), "recetas/"));
  if (snapshot.exists()) return snapshot.val();
  return {};
};


export const agregarItemLista = async (userId, item) => {
  const listaRef = ref(db, "listas/" + userId);
  await push(listaRef, { nombre: item, comprado: false, ts: Date.now() });
};

export const leerLista = async (userId) => {
  const snapshot = await get(child(ref(db), "listas/" + userId));
  if (snapshot.exists()) return snapshot.val();
  return {};
};

export const marcarComprado = async (userId, itemKey, comprado) => {
  const itemRef = ref(db, `listas/${userId}/${itemKey}`);
  await update(itemRef, { comprado });
};

export const eliminarItem = async (userId, itemKey) => {
  const itemRef = ref(db, `listas/${userId}/${itemKey}`);
  await remove(itemRef);
};
