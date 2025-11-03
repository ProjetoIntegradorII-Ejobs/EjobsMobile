import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VagasController from "../controllers/VagasController";

export default function VagasAtivas({ navigation }) {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        const empresa = JSON.parse(dados);

        if (!empresa || !empresa.id) {
          Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
          navigation.navigate("Login");
          return;
        }

        const response = await VagasController.listarPorEmpresa(empresa.id);

        if (response.success) {
          setVagas(response.vagas);
        } else {
          Alert.alert("Erro", "Não foi possível carregar as vagas.");
        }
      } catch (error) {
        console.error("❌ Erro ao carregar vagas:", error);
        Alert.alert("Erro", "Falha na comunicação com o servidor.");
      } finally {
        setLoading(false);
      }
    }

    carregarVagas();
  }, []);

  const handleVisualizarCandidatos = (vagaId) => {
    navigation.navigate("CandidatosVaga", { id: vagaId });
  };

  const handleAlterarVaga = (vagaId) => {
    navigation.navigate("EditarVaga", { id: vagaId });
  };

  const handleAlterarStatus = (vagaId, statusAtual) => {
    const acao = statusAtual === "Ativo" ? "Inativar" : "Reativar";
    const mensagem =
      statusAtual === "Ativo"
        ? "Deseja realmente inativar esta vaga?"
        : "Deseja reativar esta vaga?";

    Alert.alert(`${acao} vaga`, mensagem, [
      { text: "Cancelar", style: "cancel" },
      {
        text: acao,
        onPress: async () => {
          try {
            const result = await VagasController.alterarStatusVaga(vagaId);
            if (result.success) {
              Alert.alert("Sucesso", result.message);

              setVagas((prev) =>
                prev.map((v) =>
                  v.id === vagaId ? { ...v, status: result.novoStatus } : v
                )
              );
            } else {
              Alert.alert(
                "Erro",
                result.errors?.[0] || "Falha ao alterar status."
              );
            }
          } catch (error) {
            console.error("❌ Erro ao alterar status:", error);
            Alert.alert("Erro", "Falha na comunicação com o servidor.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10 }}>Carregando vagas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Vagas Ativas</Text>

      {vagas.length === 0 ? (
        <Text style={styles.semVagas}>Nenhuma vaga ativa encontrada.</Text>
      ) : (
        vagas.map((vaga) => (
          <View key={vaga.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.titulo}>{vaga.titulo}</Text>
              <Text style={styles.status}>
                {vaga.status === "Ativo" ? "🟢 Ativa" : "🔴 Inativa"}
              </Text>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.info}>
                <Text style={styles.bold}>Modalidade:</Text>{" "}
                {vaga.modalidade || "—"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.bold}>Horário:</Text> {vaga.horario || "—"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.bold}>Regime:</Text> {vaga.regime || "—"}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.bold}>Salário:</Text> R${" "}
                {vaga.salario || "—"}
              </Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoAzul]}
                onPress={() => handleAlterarVaga(vaga.id)}
              >
                <Text style={styles.botaoTexto}>Alterar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.botao,
                  vaga.status === "Ativo"
                    ? styles.botaoVermelho
                    : styles.botaoVerde,
                ]}
                onPress={() => handleAlterarStatus(vaga.id, vaga.status)}
              >
                <Text style={styles.botaoTexto}>
                  {vaga.status === "Ativo" ? "Inativar" : "Reativar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, styles.botaoCiano]}
                onPress={() => handleVisualizarCandidatos(vaga.id)}
              >
                <Text style={styles.botaoTexto}>Candidatos</Text>
              </TouchableOpacity>
            </View>
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
    textAlign: "center",
    color: "#111827",
    marginVertical: 10,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  semVagas: { textAlign: "center", marginTop: 20, fontSize: 16 },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  titulo: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  status: { fontSize: 14, fontWeight: "bold", color: "#2563eb" },
  cardBody: { marginVertical: 5 },
  info: { fontSize: 14, color: "#374151", marginBottom: 3 },
  bold: { fontWeight: "bold" },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  botao: {
    flex: 1,
    marginHorizontal: 3,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoAzul: { backgroundColor: "#2563eb" },
  botaoVermelho: { backgroundColor: "#dc2626" },
  botaoCiano: { backgroundColor: "#0891b2" },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  botaoVerde: { backgroundColor: "#16a34a" },
});
