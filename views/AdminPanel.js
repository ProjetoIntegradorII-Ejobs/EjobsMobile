import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AdminController from "../controllers/AdminController";
import { Ionicons } from "@expo/vector-icons";

export default function AdminPanel({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState({
    totalUsuarios: 0,
    totalCategorias: 0,
    totalCargos: 0,
  });

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const usuarios = await AdminController.listarUsuarios();
        const categorias = await AdminController.listarCategorias();
        const cargos = await AdminController.listarCargos();

        setDashboard({
          totalUsuarios: usuarios?.usuarios?.length || 0,
          totalCategorias: categorias?.categorias?.length || 0,
          totalCargos: cargos?.cargos?.length || 0,
        });
      } catch (e) {
        console.error("Erro ao carregar admin dashboard:", e);
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Painel Administrativo</Text>

      {/* Cards principais */}
      <View style={styles.cardContainer}>
        {/* Usuários */}
        <View style={styles.card}>
          <Ionicons name="people" size={40} color="#2563eb" />
          <Text style={styles.cardNumero}>{dashboard.totalUsuarios}</Text>
          <Text style={styles.cardLabel}>Total de Usuários</Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("GerenciarUsuarios")}
          >
            <Text style={styles.botaoTexto}>Gerenciar Usuários</Text>
          </TouchableOpacity>
        </View>

        {/* Categorias */}
        <View style={styles.card}>
          <Ionicons name="briefcase" size={40} color="#2563eb" />
          <Text style={styles.cardNumero}>{dashboard.totalCategorias}</Text>
          <Text style={styles.cardLabel}>Categorias</Text>

          <TouchableOpacity
            style={[styles.acaoBotao, { backgroundColor: "#2563eb" }]}
            onPress={() => navigation.navigate("GerenciarCategorias")}
          >
            <Ionicons name="folder" size={20} color="#fff" />
            <Text style={styles.acaoTexto}>Gerenciar Categorias</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Ionicons name="alert-circle" size={40} color="#f59e0b" />
          <Text style={styles.cardNumero}>{dashboard.totalPendentes}</Text>
          <Text style={styles.cardLabel}>Empresas Pendentes</Text>

          <TouchableOpacity
            style={[styles.acaoBotao, { backgroundColor: "#f59e0b" }]}
            onPress={() => navigation.navigate("EmpresasPendentes")}
          >
            <Ionicons name="checkmark-done" size={20} color="#fff" />
            <Text style={styles.acaoTexto}>Aprovar Empresas</Text>
          </TouchableOpacity>
        </View>

        {/* Cargos */}
        <View style={styles.card}>
          <Ionicons name="person" size={40} color="#2563eb" />
          <Text style={styles.cardNumero}>{dashboard.totalCargos}</Text>
          <Text style={styles.cardLabel}>Cargos</Text>

          <TouchableOpacity
            style={[styles.acaoBotao, { backgroundColor: "#2563eb" }]}
            onPress={() => navigation.navigate("GerenciarCargos")}
          >
            <Ionicons name="people" size={20} color="#fff" />
            <Text style={styles.acaoTexto}>Gerenciar Cargos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#111827",
  },
  cardContainer: {
    flexDirection: "column",
    gap: 15,
  },
  card: {
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  cardNumero: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#111827",
  },
  acoesContainer: {
    marginTop: 10,
    gap: 10,
  },
  acaoBotao: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  acaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
