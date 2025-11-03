import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
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
    useCallback(() => {
      let ativo = true;

      async function carregar() {
        try {
          setLoading(true);
          const dados = await AsyncStorage.getItem("usuarioLogado");
          if (!dados) return;

          const empresaData = JSON.parse(dados);
          setEmpresa(empresaData);

          const response = await VagasController.listarPorEmpresa(empresaData.id);
          if (ativo && response.success) {
            setVagas(response.vagas);
          }
        } catch (error) {
          console.error("❌ Erro ao carregar vagas:", error);
        } finally {
          if (ativo) setLoading(false);
        }
      }

      carregar();

      return () => {
        ativo = false;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 8, color: "#6b7280" }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.bemvindo}>
        Bem-vindo(a), {empresa?.nome || "Empresa"}!
      </Text>
      <Text style={styles.subtitulo}>
        Gerencie suas vagas de forma eficiente
      </Text>

      <TouchableOpacity
        style={styles.atualizarBotao}
        onPress={() => navigation.navigate("Empresa")}
      >
        <Ionicons name="refresh-outline" size={18} color="#fff" />
        <Text style={styles.atualizarTexto}>Atualizar</Text>
      </TouchableOpacity>

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
      </View>

      <Text style={styles.sectionTitle}>Vagas Ativas</Text>
      {vagas.length === 0 ? (
        <Text style={{ color: "#6b7280" }}>Nenhuma vaga cadastrada.</Text>
      ) : (
        vagas.map((vaga) => (
          <View key={vaga.id} style={styles.vagaCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.vagaTitulo}>{vaga.titulo}</Text>
              <Text
                style={[
                  styles.status,
                  { color: vaga.status === "Ativo" ? "#16a34a" : "#dc2626" },
                ]}
              >
                {vaga.status === "Ativo" ? "Ativa" : "Inativa"}
              </Text>
            </View>

            <Text style={styles.vagaInfo}>
              <Ionicons name="cash-outline" size={14} color="#2563eb" /> R${" "}
              {vaga.salario}
            </Text>
            <Text style={styles.vagaInfo}>
              <Ionicons name="time-outline" size={14} color="#2563eb" />{" "}
              {vaga.horario || "—"}
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
  bemvindo: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  subtitulo: { color: "#6b7280", marginBottom: 16 },
  atualizarBotao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  atualizarTexto: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
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
  vagaTitulo: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  vagaInfo: { fontSize: 14, color: "#374151", marginTop: 2 },
  status: { fontWeight: "bold" },
});
