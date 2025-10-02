import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { crearReceta } from "../services/firebaseService";

export default function CreateRecipeScreen() {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [pasos, setPasos] = useState("");

  const handleGuardar = async () => {
    if (!nombre.trim()) {
      Alert.alert("Falta nombre", "Ingresa el nombre de la receta");
      return;
    }
    const receta = {
      nombre: nombre.trim(),
      ingredientes: ingredientes.split(",").map(s => s.trim()).filter(Boolean),
      pasos: pasos.trim(),
      ts: Date.now(),
    };
    try {
         console.log(receta)
      await crearReceta(receta);
      setNombre(""); setIngredientes(""); setPasos("");
      console.log("hola bombom")
      Alert.alert("Éxito", "Receta guardada en Firebase ✅");
    } catch (e) {
        console.log("pailas")
        console.log(e)
      Alert.alert("Error", String(e?.message || e));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre de la receta"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingredientes separados por coma"
        value={ingredientes}
        onChangeText={setIngredientes}
        style={styles.input}
      />
      <TextInput
        placeholder="Pasos / Instrucciones"
        value={pasos}
        onChangeText={setPasos}
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        multiline
      />
      <Button title="Guardar receta" onPress={handleGuardar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
});