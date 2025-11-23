import React, { useEffect, useState } from "react";
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

export default function GerenciarCategorias({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCategorias();
  }, []);

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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10 }}>Carregando categorias...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lista de Categorias</Text>

      <TouchableOpacity
        style={styles.botaoInserir}
        onPress={() => navigation.navigate("AdminCadastrarCategoria")}
      >
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.textoInserir}>Inserir</Text>
      </TouchableOpacity>

      <View style={styles.tabelaCabecalho}>
        <Text style={[styles.coluna, { flex: 1 }]}>ID</Text>
        <Text style={[styles.coluna, { flex: 3 }]}>Nome</Text>
        <Text style={[styles.coluna, { flex: 3 }]}>Ícone</Text>
        <Text style={[styles.coluna, { flex: 2 }]}></Text>
      </View>

      {categorias.map((cat) => (
        <View key={cat.id} style={styles.tabelaLinha}>
          <Text style={[styles.coluna, { flex: 1 }]}>{cat.id}</Text>
          <Text style={[styles.coluna, { flex: 3 }]}>{cat.nome}</Text>
          <Text style={[styles.coluna, { flex: 3 }]}>{cat.icone || "-"}</Text>

          <View style={[styles.botoes]}>
            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoAzul]}
              onPress={() =>
                navigation.navigate("AdminEditarCategoria", {
                  id: cat.id,
                  nome: cat.nome,
                  icone: cat.icone
                })
              }
            >
              <Text style={styles.textoBotao}>Alterar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoVermelho]}
              onPress={() => excluirCategoria(cat.id)}
            >
              <Text style={styles.textoBotao}>Excluir</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginVertical: 15,
  },
  botaoInserir: {
    backgroundColor: "#16a34a",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    width: 110,
    marginBottom: 15,
  },
  textoInserir: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
  tabelaCabecalho: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  tabelaLinha: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  coluna: { fontSize: 14, color: "#374151" },
  botoes: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-between",
  },
  botaoAcao: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  botaoAzul: { backgroundColor: "#2563eb" },
  botaoVermelho: { backgroundColor: "#dc2626" },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
