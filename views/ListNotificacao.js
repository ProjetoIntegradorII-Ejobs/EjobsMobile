import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import NotificacaoController from "../controllers/NotificacaoController";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificacoesList({ navigation, route }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [carregandoBusca, setCarregandoBusca] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        if (!dados) return;

        const usuario = JSON.parse(dados);
        const data = await NotificacaoController.listarPorUsuario(usuario.id);
        setNotificacoes(data.notificacoes || []);
      } catch (err) {
        console.error("Erro ao carregar notificações:", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [route.params?.atualizar]);

    const handleNotificacaoPress = async (item) => {
        try {
        if (item.lida == 0) {
            await NotificacaoController.marcarLido(item.id);
            setNotificacoes((prev) =>
            prev.map((n) => (n.id === item.id ? { ...n, lida: 1 } : n))
            );
        }
        navigation.navigate("NotificacaoDetalhes", { id: item.id });
        } catch (err) {
        console.error(err);
        }
    };



  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    

      {/* Lista */}
      {notificacoes.length === 0 ? (
        <Text style={styles.semVagas}>Nenhuma notificação encontrada.</Text>
      ) : (
        <FlatList
          data={notificacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                item.lida == 0 && styles.naoLida, // marca visual para não lida
              ]}
              onPress={() => handleNotificacaoPress(item)}
            >
              <Text style={styles.titulo}>{item.tipo}</Text>

              <Text numberOfLines={2} style={styles.msg}>
                {item.mensagem}
              </Text>

              <Text style={styles.info}>
                De: {item.nome_origem} — Vaga: {item.titulo_vaga}
              </Text>

              <Text style={styles.data}>{item.data_criacao}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },

  inputBusca: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  naoLida: {
    borderLeftWidth: 5,
    borderLeftColor: "#2563eb",
  },

  titulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },

  msg: {
    fontSize: 14,
    marginBottom: 5,
  },

  info: {
    color: "#555",
    fontSize: 13,
  },

  data: {
    marginTop: 5,
    fontSize: 12,
    color: "#888",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  semVagas: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#555",
  },
});
