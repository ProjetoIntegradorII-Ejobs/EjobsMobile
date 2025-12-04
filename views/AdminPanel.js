import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminController from "../controllers/AdminController";
import { Ionicons } from "@expo/vector-icons";

export default function AdminPanel({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalUsuarios: 0,
    totalCategorias: 0,
    totalCargos: 0,
    totalPendentes: 0,
  });

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const usuarios = await AdminController.listarUsuarios();
        const categorias = await AdminController.listarCategorias();
        const cargos = await AdminController.listarCargos();
        const pendentes =
          (await AdminController.listarEmpresasPendentes?.()) || [];

        setDashboard({
          totalUsuarios: usuarios?.usuarios?.length || 0,
          totalCategorias: categorias?.categorias?.length || 0,
          totalCargos: cargos?.cargos?.length || 0,
          totalPendentes: pendentes.length || 0,
        });
      } catch (e) {
        console.error("Erro ao carregar admin dashboard:", e);
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

 
  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja encerrar a sessão do administrador?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("usuarioLogado");
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
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
        <Text style={styles.titulo}>Painel Administrativo</Text>

        <View style={styles.cardContainer}>

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
            <Ionicons name="folder-open" size={40} color="#2563eb" />
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

          <View style={styles.card}>
            <Ionicons name="briefcase" size={40} color="#2563eb" />
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

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutTexto}>Sair</Text>
        </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#111827",
  },

  cardContainer: {
    flexDirection: "column",
    gap: 18,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },

  cardNumero: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1e293b",
  },

  cardLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  acaoBotao: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
    width: "80%",
  },

  acaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  logoutBtn: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  logoutTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
