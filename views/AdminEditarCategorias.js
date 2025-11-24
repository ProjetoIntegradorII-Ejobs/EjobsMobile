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

export default function AdminEditarCategoria({ route, navigation }) {
  const { id, nome: nomeInicial, icone: iconeInicial } = route.params;

  const [nome, setNome] = useState(nomeInicial);
  const [icone, setIcone] = useState(iconeInicial);

  const salvar = async () => {
    if (!nome.trim() || !icone.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const result = await AdminController.editarCategoria(id, nome, icone);

    if (result.success) {
      Alert.alert("Sucesso", result.message);
      navigation.goBack();
    } else {
      Alert.alert("Erro", result.error || "Falha ao editar categoria.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Editar Categoria</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ícone</Text>
        <TextInput
          style={styles.input}
          value={icone}
          onChangeText={setIcone}
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar Alterações</Text>
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
    backgroundColor: "#f9fafb",
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
