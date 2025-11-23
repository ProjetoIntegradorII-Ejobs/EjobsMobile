import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import VagasController from "../controllers/VagasController";

export default function Empresa({ navigation }) {
  const [empresa, setEmpresa] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        if (dados) {
          const empresaData = JSON.parse(dados);
          setEmpresa(empresaData);

          const response = await VagasController.listarPorEmpresa(
            empresaData.id
          );

          if (response.success) {
            setVagas(response.vagas);
          }
        }
        setLoading(false);
      }
      carregar();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da conta?", [
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
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.bemvindo}>
            {empresa?.nome || "Empresa"}
          </Text>
          <Text style={styles.subLabel}>Painel da Empresa</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* DASHBOARD */}
      <View style={styles.dashboardRow}>
        <View style={styles.dashboardCard}>
          <Ionicons name="briefcase-outline" size={32} color="#2563eb" />
          <Text style={styles.cardNumero}>{vagas.length}</Text>
          <Text style={styles.cardTexto}>Vagas criadas</Text>
        </View>

      </View>

      {/* MENU */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("VagasAtivas")}
        >
          <Ionicons name="list-outline" size={28} color="#2563eb" />
          <View>
            <Text style={styles.menuTitle}>Gerenciar Vagas</Text>
            <Text style={styles.menuDesc}>
              Editar, ativar e acompanhar candidatos
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("FormVagas")}
        >
          <Ionicons name="add-circle-outline" size={28} color="#16a34a" />
          <View>
            <Text style={[styles.menuTitle, { color: "#16a34a" }]}>
              Criar Nova Vaga
            </Text>
            <Text style={styles.menuDesc}>
              Publique oportunidades para candidatos
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("EmpresaEditar")}
        >
          <Ionicons name="settings-outline" size={28} color="#2563eb" />
          <View>
            <Text style={styles.menuTitle}>Editar Perfil</Text>
            <Text style={styles.menuDesc}>
              Atualize suas informações e dados
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* LISTAGEM DE VAGAS */}
      <Text style={styles.sectionTitle}>Últimas Vagas</Text>

      {vagas.length === 0 ? (
        <Text style={{ color: "#6b7280" }}>Nenhuma vaga cadastrada ainda.</Text>
      ) : (
        vagas.map((vaga) => (
          <View key={vaga.id} style={styles.vagaCard}>
            <Text style={styles.vagaTitulo}>{vaga.titulo}</Text>
            <Text style={styles.vagaInfo}>
              <Ionicons name="cash-outline" size={14} color="#2563eb" /> R${" "}
              {vaga.salario}
            </Text>
            <Text style={styles.vagaInfo}>
              <Ionicons name="time-outline" size={14} color="#2563eb" />{" "}
              {vaga.horario}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  bemvindo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  subLabel: {
    color: "#64748b",
    fontSize: 12,
    marginTop: -3,
  },

  logoutBtn: { padding: 6 },

  dashboardRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  dashboardCard: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  cardNumero: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 4,
  },

  cardTexto: { fontSize: 13, color: "#64748b" },

  actions: { marginTop: 25 },

  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 16,
    elevation: 1,
    gap: 12,
  },

  menuTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
  },

  menuDesc: {
    fontSize: 13,
    color: "#475569",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 12,
    color: "#111827",
  },

  vagaCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  vagaTitulo: { fontSize: 16, fontWeight: "bold", color: "#111827" },

  vagaInfo: { color: "#374151", marginTop: 3 },
});
