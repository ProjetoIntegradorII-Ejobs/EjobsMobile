import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import CandidaturaController from "../controllers/CandidaturaController";

export default function CandidatosVaga({ route }) {
  const { id } = route.params; 
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    const result = await CandidaturaController.listarPorVaga(id);

    if (result.success) {
      setCandidatos(result.candidatos);
    } else {
      Alert.alert("Erro", "Não foi possível carregar os candidatos.");
    }

    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, [id]);

  async function aprovar(idCandidatura) {
    const result = await CandidaturaController.aprovar(idCandidatura);

    if (result.success) {
      Alert.alert("Sucesso", "Candidato aprovado!");
      carregar();
    } else {
      Alert.alert("Erro", result.errors?.[0] || "Erro ao aprovar.");
    }
  }

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
          <View key={c.candidatura_id} style={styles.card}>
            <Text style={styles.nome}>{c.nome}</Text>
            <Text>Email: {c.email}</Text>
            <Text>Telefone: {c.telefone || "Não informado"}</Text>
            <Text>Descrição: {c.descricao || "Sem descrição"}</Text>

            {/* STATUS */}
            <Text style={styles.statusTitle}>Status:</Text>
            <Text
              style={[
                styles.status,
                c.candidatura_status?.toUpperCase() === "APROVADO"
                  ? styles.aprovado
                  : styles.pendente,
              ]}
            >
              {c.candidatura_status}
            </Text>

            {/* BOTÃO APROVAR */}
            {c.candidatura_status?.toUpperCase() !== "APROVADO" && (
              <TouchableOpacity
                style={[styles.btn, styles.btnAprovar]}
                onPress={() => aprovar(c.candidatura_id)}
              >
                <Text style={styles.btnText}>Aprovar</Text>
              </TouchableOpacity>
            )}

          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#111",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", fontSize: 16, marginTop: 20 },

  card: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },

  nome: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },

  statusTitle: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#111",
  },

  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 5,
    fontWeight: "600",
    textAlign: "center",
  },

  aprovado: { backgroundColor: "#dcfce7", color: "#166534" },
  pendente: { backgroundColor: "#fef9c3", color: "#854d0e" },

  btn: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  btnAprovar: { backgroundColor: "#16a34a" },
  btnText: { color: "#fff", fontWeight: "bold" },
});
