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
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import AdminController from "../controllers/AdminController";
import { Ionicons } from "@expo/vector-icons";

export default function GerenciarCategorias({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega na primeira vez
  useEffect(() => {
    carregarCategorias();
  }, []);

  // 🔵 Recarrega automaticamente quando a tela volta a ficar ativa
  useFocusEffect(
    useCallback(() => {
      carregarCategorias();
    }, [])
  );

  const carregarCategorias = async () => {
    setLoading(true);

    const result = await AdminController.listarCategorias();

    if (result.success && result.categorias) {
      setCategorias(result.categorias);
    } else {
      Alert.alert("Erro", "Não foi possível carregar as categorias.");
    }

    setLoading(false);
  };

  const excluirCategoria = (id) => {
    Alert.alert(
      "Excluir Categoria",
      "Deseja realmente excluir esta categoria?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const result = await AdminController.excluirCategoria(id);

            if (result.success) {
              Alert.alert("Sucesso", result.message);
              carregarCategorias();
            } else {
              Alert.alert("Erro", result.error || "Falha ao excluir.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10 }}>Carregando categorias...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>Gerenciar Categorias</Text>

        {/* Botão Nova Categoria */}
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() =>
            navigation.navigate("AdminCadastrarCategoria", {
              onUpdate: carregarCategorias, // 🟢 manda callback
            })
          }
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.btnAddTexto}>Nova Categoria</Text>
        </TouchableOpacity>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.headerText, { flex: 1 }]}>ID</Text>
          <Text style={[styles.headerText, { flex: 3 }]}>Nome</Text>
          <Text style={[styles.headerText, { flex: 3 }]}>Ícone</Text>
          <Text style={[styles.headerText, { flex: 2 }]}>Ações</Text>
        </View>

        {/* Lista */}
        {categorias.map((cat) => (
          <View key={cat.id} style={styles.row}>
            <Text style={[styles.rowText, { flex: 1 }]}>{cat.id}</Text>
            <Text style={[styles.rowText, { flex: 3 }]}>{cat.nome}</Text>
            <Text style={[styles.rowText, { flex: 3 }]}>{cat.icone || "-"}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.editBtn]}
                onPress={() =>
                  navigation.navigate("AdminEditarCategoria", {
                    id: cat.id,
                    nome: cat.nome,
                    icone: cat.icone,
                    onUpdate: carregarCategorias, // 🟢 update após edição
                  })
                }
              >
                <Ionicons name="create-outline" size={18} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => excluirCategoria(cat.id)}
              >
                <Ionicons name="trash-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },

  btnAdd: {
    backgroundColor: "#2563eb",
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
