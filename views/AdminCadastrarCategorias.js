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
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import AdminController from "../controllers/AdminController";

export default function AdminCadastrarCategoria({ navigation }) {

  // LISTA PROFISSIONAL DE ÍCONES
  const iconesDisponiveis = [
    "briefcase-outline",
    "laptop-outline",
    "construct-outline",
    "people-outline",
    "school-outline",
    "cash-outline",
    "barbell-outline",
    "restaurant-outline",
    "medkit-outline",
    "car-outline",
    "airplane-outline",
    "globe-outline",
  ];


  const [nome, setNome] = useState("");
  const [icone, setIcone] = useState(iconesDisponiveis[0]);

  const salvar = async () => {

    if (!nome.trim() || !icone.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const result = await AdminController.salvarCategoria(nome, icone);

    if (result.success) {
      Alert.alert("Sucesso", result.message);
      navigation.goBack();
    } else {
      Alert.alert("Erro", result.error || "Não foi possível salvar a categoria.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Categoria</Text>

      {/* Nome */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome da Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Marketing"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      {/* Picker de Ícones */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ícone</Text>

        {/* Preview do ícone */}
        <View style={styles.previewBox}>
          <Ionicons name={icone} size={32} color="#2563eb" />
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={icone}
            onValueChange={(value) => setIcone(value)}
            style={styles.picker}
          >
            {iconesDisponiveis.map((icon) => (
              <Picker.Item key={icon} label={icon} value={icon} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Botão salvar */}
      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar Categoria</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },

  formGroup: { marginBottom: 20 },

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

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },

  picker: {
    height: 50,
  },

  previewBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#eef2ff",
    marginBottom: 10,
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
