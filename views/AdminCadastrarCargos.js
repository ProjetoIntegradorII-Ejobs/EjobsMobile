import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AdminController from "../controllers/AdminController";

export default function AdminCadastrarCargos({ navigation }) {
  const [nome, setNome] = useState("");

  const salvar = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O nome do cargo é obrigatório.");
      return;
    }

    const result = await AdminController.salvarCargo(nome);

    if (result.success) {
      Alert.alert("Sucesso", result.message);
      setNome("");
      navigation.goBack(); 
    } else {
      Alert.alert("Erro", result.error || "Não foi possível salvar o cargo.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Novo Cargo</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do Cargo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Desenvolvedor Back-End"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar Cargo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
