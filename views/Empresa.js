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
import { useFocusEffect } from "@react-navigation/native"; // 🔥 IMPORTANTE
import VagasController from "../controllers/VagasController";

export default function Empresa({ navigation }) {
  const [empresa, setEmpresa] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Atualiza automaticamente quando voltar do Editar Perfil
  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        if (dados) {
          const empresaData = JSON.parse(dados);
          setEmpresa(empresaData);

          const response = await VagasController.listarPorEmpresa(empresaData.id);
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
      <View style={styles.headerRow}>
        <Text style={styles.bemvindo}>
          Bem-vindo(a), {empresa?.nome || "Empresa"}!
        </Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>
        Gerencie suas vagas de forma eficiente
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("VagasAtivas")}
        >
          <Ionicons name="briefcase-outline" size={36} color="#2563eb" />
          <Text style={styles.cardNumero}>{vagas.length}</Text>
          <Text style={styles.cardTexto}>Vagas Ativas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("FormVagas")}
        >
          <Ionicons name="add-circle-outline" size={36} color="#16a34a" />
          <Text style={styles.cardTexto}>Criar Vaga</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoAzul}
          onPress={() => navigation.navigate("EmpresaEditar")}
        >
          <Text style={styles.botaoTexto}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Vagas Ativas</Text>
      {vagas.length === 0 ? (
        <Text style={{ color: "#6b7280" }}>Nenhuma vaga cadastrada.</Text>
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
  },
  bemvindo: { fontSize: 22, fontWeight: "bold", color: "#111827", flex: 1 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoutText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitulo: { color: "#6b7280", marginBottom: 16 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  card: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
    marginHorizontal: 5,
  },
  cardNumero: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 4,
  },
  cardTexto: { fontSize: 14, color: "#374151" },
  botaoAzul: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  vagaCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  vagaTitulo: { fontSize: 16, fontWeight: "bold" },
  vagaInfo: { fontSize: 14, color: "#374151" },
});
