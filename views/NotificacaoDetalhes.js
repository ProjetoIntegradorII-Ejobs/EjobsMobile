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
import NotificacaoController from "../controllers/NotificacaoController";

export default function NotificacaoDetalhes({ route, navigation }) {
  const { id } = route.params;
  const [notificacao, setNotificacao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarNotificacao() {
      try {
        const data = await NotificacaoController.getNotificacaoById(id);
        setNotificacao(data.notificacoes[0]);
      } catch (err) {
        console.error("Erro ao carregar notificação:", err);
        Alert.alert("Erro", "Não foi possível carregar a notificação.");
      } finally {
        setLoading(false);
      }
    }
    carregarNotificacao();
  }, [id]);

  const handleExcluir = async () => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir esta notificação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await NotificacaoController.excluirNotificacao(id);
              if (result.success) {
                Alert.alert("Sucesso", "Notificação excluída.");
                navigation.navigate("ListNotificacao");
              } else {
                Alert.alert("Erro", result.errors?.[0] || "Falha ao excluir.");
              }
            } catch (err) {
              console.error(err);
              Alert.alert("Erro", "Falha ao excluir notificação.");
            }
          },
        },
      ]
    );
  };

  if (loading || !notificacao) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{notificacao.tipo}</Text>
        <Text style={styles.subtitulo}>De: {notificacao.nome_origem}</Text>
       
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.texto}>Mensagem:</Text>
        <Text style={styles.texto}>{notificacao.mensagem}</Text>
        {notificacao.titulo_vaga && (
          <>
            <Text style={styles.texto}>Vaga relacionada:</Text>
            <Text style={styles.texto}>{notificacao.titulo_vaga}</Text>
          </>
        )}
        <Text style={styles.texto}>Recebida : {notificacao.data_criacao}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonExcluir} onPress={handleExcluir}>
          <Text style={styles.buttonText}>Excluir Notificação</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { borderBottomWidth: 1, borderBottomColor: "#e5e7eb", marginBottom: 10 },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#111827", marginBottom: 4 },
  subtitulo: { fontSize: 14, color: "#2563eb", marginBottom: 2 },
  infoBox: { marginVertical: 15 },
  texto: { fontSize: 14, color: "#374151", lineHeight: 20, marginBottom: 8 },
  buttonContainer: { marginTop: 20 },
  buttonExcluir: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#dc2626", 
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
