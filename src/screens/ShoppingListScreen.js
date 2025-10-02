import React, { useState, useEffect, useMemo } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { agregarItemLista, leerLista, marcarComprado, eliminarItem } from "../services/firebaseService";
import Ionicons from "@expo/vector-icons/Ionicons";

const USER_ID = "demoUser"; // Reemplaza por auth.uid si agregas autenticación

export default function ShoppingListScreen() {
  const [item, setItem] = useState("");
  const [lista, setLista] = useState({});

  const loadLista = async () => {
    const data = await leerLista(USER_ID);
    setLista(data || {});
  };

  useEffect(() => { loadLista(); }, []);

  const dataArr = useMemo(() => Object.entries(lista).map(([key, val]) => ({ key, ...val })), [lista]);

  const handleAgregar = async () => {
    if (!item.trim()) return;
    await agregarItemLista(USER_ID, item.trim());
    setItem("");
    loadLista();
  };

  const toggleComprado = async (key, current) => {
    await marcarComprado(USER_ID, key, !current);
    loadLista();
  };

  const handleEliminar = async (key) => {
    await eliminarItem(USER_ID, key);
    loadLista();
  };

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.text, item.comprado && styles.comprado]}>• {item.nombre}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={() => toggleComprado(item.key, item.comprado)}>
          <Ionicons name={item.comprado ? "checkbox" : "square-outline"} size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEliminar(item.key)}>
          <Ionicons name="trash" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.addRow}>
        <TextInput
          placeholder="Nuevo producto"
          value={item}
          onChangeText={setItem}
          style={styles.input}
        />
        <Button title="Agregar" onPress={handleAgregar} />
      </View>
      <FlatList
        data={dataArr}
        keyExtractor={(it) => it.key}
        renderItem={renderRow}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Tu lista está vacía</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 },
  text: { fontSize: 16 },
  comprado: { textDecorationLine: "line-through", opacity: 0.6 },
});
