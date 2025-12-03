import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";  // ✅ IMPORTAÇÃO CORRETA
import AsyncStorage from "@react-native-async-storage/async-storage";
import CandidaturaController from "../controllers/CandidaturaController";

export default function MinhasCandidaturas({ navigation }) {
  const [candidaturas, setCandidaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const dados = await AsyncStorage.getItem("usuarioLogado");
      if (!dados) return;

      const usuario = JSON.parse(dados);
      const result = await CandidaturaController.getCandidaturaByUsuario(usuario.id);

      if (Array.isArray(result)) {
        setCandidaturas(result);
      }

      setLoading(false);
    }

    carregar();
  }, []);

  const cancelarCandidatura = (id) => {
    Alert.alert(
      "Cancelar candidatura",
      "Tem certeza que deseja cancelar esta candidatura?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            const response = await CandidaturaController.cancelarCandidatura(id);

            if (response.success) {
              Alert.alert("Sucesso", "Candidatura cancelada!");
              setCandidaturas((prev) => prev.filter((item) => item.id !== id));
            } else {
              Alert.alert("Erro", "Não foi possível cancelar a candidatura.");
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
      </View>
    );
  }

  if (!candidaturas.length) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#6b7280" }}>
          Você ainda não se candidatou a nenhuma vaga.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={candidaturas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }} // ⭐ EVITA SOBREPOSIÇÃO COM NAVBAR
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.vagaTitulo}>{item.vaga_titulo}</Text>
            <Text style={styles.vagaEmpresa}>{item.empresa}</Text>

            <Text style={styles.vagaCargo}>Cargo: {item.vaga_cargo}</Text>

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
              {item.status === "FINALIZADO" ? "Finalizado" : "Em andamento"}
            </Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnDetalhes}
                onPress={() =>
                  navigation.navigate("VagaDetalhes", { id: item.vaga_id })
                }
              >
                <Text style={styles.btnDetalhesTexto}>Ver detalhes</Text>
              </TouchableOpacity>

              {item.status !== "FINALIZADO" && (
                <TouchableOpacity
                  style={styles.btnCancelar}
                  onPress={() => cancelarCandidatura(item.id)}
                >
                  <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },

  container: { flex: 1, backgroundColor: "#f8fafc", padding: 15 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  vagaTitulo: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  vagaEmpresa: { color: "#2563eb", fontWeight: "600" },
  vagaCargo: { color: "#374151" },

  data: { color: "#6b7280", fontSize: 13, marginTop: 4 },

  status: { marginTop: 6, fontWeight: "bold", textAlign: "right" },
  statusAndamento: { color: "#10b981" },
  statusFinalizado: { color: "#ef4444" },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  btnDetalhes: {
    backgroundColor: "#2563eb",
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancelar: {
    backgroundColor: "#f3f4f6",
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  btnDetalhesTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnCancelarTexto: {
    color: "#ef4444",
    fontWeight: "bold",
  },
});
