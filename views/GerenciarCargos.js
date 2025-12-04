import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AdminController from "../controllers/AdminController";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function GerenciarCargos({ navigation }) {
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    carregarCargos();
  }, []);


  useFocusEffect(
    useCallback(() => {
      carregarCargos();
    }, [])
  );

  const carregarCargos = async () => {
    setLoading(true);

    const result = await AdminController.listarCargos();

    if (result.success && result.cargos) {
      setCargos(result.cargos);
    } else {
      Alert.alert("Erro", "Não foi possível carregar os cargos.");
    }

    setLoading(false);
  };

  const excluirCargo = (id) => {
    Alert.alert("Excluir Cargo", "Deseja realmente excluir este cargo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const result = await AdminController.excluirCargo(id);

          if (result.success) {
            Alert.alert("Sucesso", result.message);
            carregarCargos();
          } else {
            Alert.alert("Erro", result.error || "Falha ao excluir.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10 }}>Carregando cargos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Cargos</Text>

      {/* Botão Novo */}
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() =>
          navigation.navigate("AdminCadastrarCargos", {
            onUpdate: carregarCargos,
          })
        }
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.btnAddTexto}>Novo Cargo</Text>
      </TouchableOpacity>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { flex: 1 }]}>ID</Text>
        <Text style={[styles.headerText, { flex: 4 }]}>Nome</Text>
        <Text style={[styles.headerText, { flex: 2 }]}>Ações</Text>
      </View>

      {/* Lista */}
      {cargos.map((cargo) => (
        <View key={cargo.id} style={styles.row}>
          <Text style={[styles.rowText, { flex: 1 }]}>{cargo.id}</Text>
          <Text style={[styles.rowText, { flex: 4 }]}>{cargo.nome}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={() =>
                navigation.navigate("AdminEditarCargo", {
                  id: cargo.id,
                  nome: cargo.nome,
                  onUpdate: carregarCargos,
                })
              }
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={() => excluirCargo(cargo.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },

  btnAdd: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  btnAddTexto: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },

  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },

  rowText: {
    fontSize: 15,
    color: "#374151",
  },

  actions: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "flex-end",
    gap: 10,
  },

  actionBtn: {
    padding: 8,
    borderRadius: 6,
  },

  editBtn: {
    backgroundColor: "#2563eb",
  },

  deleteBtn: {
    backgroundColor: "#dc2626",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
