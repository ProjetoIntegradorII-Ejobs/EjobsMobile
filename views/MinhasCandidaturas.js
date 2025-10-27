import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CandidaturaController from "../controllers/CandidaturaController";

export default function MinhasCandidaturas() {
  const [candidaturas, setCandidaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const dados = await AsyncStorage.getItem("usuarioLogado");
      if (!dados) return;

      const usuario = JSON.parse(dados);
      const result = await CandidaturaController.listarPorCandidato(usuario.id);

      if (result.success) {
        setCandidaturas(result.candidaturas || []);
      }
      setLoading(false);
    }

    carregar();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!candidaturas.length) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#6b7280" }}>Você ainda não se candidatou a nenhuma vaga.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minhas Candidaturas</Text>

      <FlatList
        data={candidaturas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.vagaTitulo}>{item.vaga.titulo}</Text>
            <Text style={styles.vagaEmpresa}>{item.vaga.empresa}</Text>
            <Text style={styles.vagaCargo}>Cargo: {item.vaga.cargo}</Text>
            <Text style={styles.vagaSalario}>Salário: R$ {item.vaga.salario}</Text>
            <Text style={styles.data}>
              Candidatado em: {item.data_candidatura.split(" ")[0]}
            </Text>
            <Text
              style={[
                styles.status,
                item.status === "FINALIZADO"
                  ? styles.statusFinalizado
                  : styles.statusAndamento,
              ]}
            >
              {item.status === "FINALIZADO"
                ? "Finalizado"
                : "Em andamento"}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#2563eb" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vagaTitulo: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  vagaEmpresa: { color: "#2563eb", fontWeight: "600" },
  vagaCargo: { color: "#374151" },
  vagaSalario: { color: "#374151", marginBottom: 4 },
  data: { color: "#6b7280", fontSize: 13 },
  status: { marginTop: 6, fontWeight: "bold", textAlign: "right" },
  statusAndamento: { color: "#10b981" },
  statusFinalizado: { color: "#ef4444" },
});
