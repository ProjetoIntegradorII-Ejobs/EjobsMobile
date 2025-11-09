import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import CandidaturaController from "../controllers/CandidaturaController";

export default function CandidatosVaga({ route }) {
  const { id } = route.params;
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const result = await CandidaturaController.listarPorVaga(id);
      if (result.success) {
        setCandidatos(result.candidatos);
      }
      setLoading(false);
    }
    carregar();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Candidatos da Vaga</Text>
      {candidatos.length === 0 ? (
        <Text style={styles.empty}>Nenhum candidato encontrado.</Text>
      ) : (
        candidatos.map((c) => (
          <View key={c.id} style={styles.card}>
            <Text style={styles.nome}>{c.nome}</Text>
            <Text>Email: {c.email}</Text>
            <Text>Telefone: {c.telefone || "Não informado"}</Text>
            <Text>Descrição: {c.descricao || "Sem descrição"}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", fontSize: 16, marginTop: 20 },
  card: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  nome: { fontSize: 18, fontWeight: "bold", color: "#111827" },
});
