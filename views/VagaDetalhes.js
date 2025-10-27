import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import VagasController from "../controllers/VagasController";
import CandidaturaController from "../controllers/CandidaturaController";

export default function VagaDetalhes({ route, navigation }) {
  const { id } = route.params;
  const [vaga, setVaga] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jaCandidatado, setJaCandidatado] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const vagaData = await VagasController.getVagaById(id);
        setVaga(vagaData);
      } catch (err) {
        console.error("Erro ao carregar vaga:", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  // 🔹 Verifica se o usuário já se candidatou
  useEffect(() => {
    async function verificarCandidatura() {
      const dados = await AsyncStorage.getItem("usuarioLogado");
      if (!dados) return;
      const user = JSON.parse(dados);
      setUsuario(user);

      const result = await CandidaturaController.verificar(user.id, id);
      if (result.success && result.jaCandidatado) setJaCandidatado(true);
    }
    verificarCandidatura();
  }, [id]);

  const handleCandidatar = async () => {
    if (!usuario) {
      Alert.alert("Login necessário", "Faça login para se candidatar.");
      return;
    }

    const result = await CandidaturaController.candidatar(usuario.id, id);
    if (result.success) {
      setJaCandidatado(true);
      Alert.alert("Sucesso", result.message);
    } else if (result.jaCandidatado) {
      setJaCandidatado(true);
      Alert.alert("Atenção", "Você já se candidatou a esta vaga.");
    } else {
      Alert.alert("Erro", result.errors?.[0] || "Falha ao se candidatar.");
    }
  };

  if (loading || !vaga) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 🔹 Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>{vaga.titulo}</Text>
        <Text style={styles.empresa}>
          <Ionicons name="business-outline" size={16} color="#2563eb" />{" "}
          {vaga.empresa} — {vaga.cargo}
        </Text>
      </View>

      {/* 🔹 Informações da vaga */}
      <View style={styles.infoBox}>
        <Text style={styles.info}>
          <Ionicons name="briefcase-outline" size={16} color="#2563eb" />{" "}
          Modalidade: {vaga.modalidade || "-"}
        </Text>
        <Text style={styles.info}>
          <Ionicons name="cash-outline" size={16} color="#2563eb" /> Salário:{" "}
          {vaga.salario ? `R$ ${vaga.salario}` : "A combinar"}
        </Text>
        <Text style={styles.info}>
          <Ionicons name="document-text-outline" size={16} color="#2563eb" /> Regime:{" "}
          {vaga.regime || "-"}
        </Text>
        <Text style={styles.info}>
          <Ionicons name="time-outline" size={16} color="#2563eb" /> Horário:{" "}
          {vaga.horario || "-"}
        </Text>
        <Text style={styles.info}>
          <Ionicons name="ellipse-outline" size={16} color="#2563eb" /> Status:{" "}
          {vaga.status || "Ativo"}
        </Text>
      </View>

      {/* 🔹 Seções de texto */}
      <Text style={styles.subtitulo}>Requisitos</Text>
      <Text style={styles.texto}>{vaga.requisitos || "Não informados."}</Text>

      <Text style={styles.subtitulo}>Descrição</Text>
      <Text style={styles.texto}>{vaga.descricao || "Não informada."}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={jaCandidatado}
          style={[
            styles.button,
            jaCandidatado ? styles.buttonDisabled : styles.buttonActive,
          ]}
          onPress={handleCandidatar}
        >
          <Text style={styles.buttonText}>
            {jaCandidatado
              ? "Candidatura já realizada para esta vaga"
              : "Candidatar-se"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { borderBottomWidth: 1, borderBottomColor: "#e5e7eb", marginBottom: 10 },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  empresa: { fontSize: 15, color: "#2563eb", marginTop: 3 },
  infoBox: { marginVertical: 15 },
  info: { fontSize: 14, marginVertical: 3, color: "#374151" },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 10,
    marginBottom: 4,
  },
  texto: { fontSize: 14, color: "#374151", lineHeight: 20, marginBottom: 8 },
  buttonContainer: { marginTop: 20 },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonActive: { backgroundColor: "#2563eb" },
  buttonDisabled: { backgroundColor: "#9ca3af" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
