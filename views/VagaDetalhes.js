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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  // 🔹 Carrega usuário e verifica candidatura
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
      <Text style={styles.titulo}>{vaga.titulo}</Text>
      <Text style={styles.empresa}>{vaga.empresa} - {vaga.cargo}</Text>

      <Text style={styles.info}>Modalidade: {vaga.modalidade}</Text>
      <Text style={styles.info}>Salário: R$ {vaga.salario}</Text>

      <Text style={styles.subtitulo}>Descrição</Text>
      <Text style={styles.texto}>{vaga.descricao}</Text>

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
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  empresa: { fontSize: 16, color: "#2563eb", marginBottom: 10 },
  info: { marginBottom: 5 },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  texto: { marginTop: 5, lineHeight: 20 },
  buttonContainer: { marginTop: 20, alignItems: "center" },
  button: {
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonActive: { backgroundColor: "#2563eb" },
  buttonDisabled: { backgroundColor: "#9ca3af" },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
