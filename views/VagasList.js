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
import VagasController from "../controllers/VagasController";
import { Ionicons } from "@expo/vector-icons";

export default function VagasList({ navigation }) {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [carregandoBusca, setCarregandoBusca] = useState(false);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const data = await VagasController.getVagas();
        setVagas(data);
      } catch (err) {
        console.error("Erro ao carregar vagas:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarVagas();
  }, []);

  async function pesquisar(texto) {
    setBusca(texto);
    setCarregandoBusca(true);

    if (texto.trim() === "") {
      const data = await VagasController.getVagas();
      setVagas(data);
      setCarregandoBusca(false);
      return;
    }

    const result = await VagasController.buscar(texto);

    if (Array.isArray(result)) {
      setVagas(result);
    } else {
      setVagas([]);
    }

    setCarregandoBusca(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de busca estilizada */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#6b7280" />
        <TextInput
          placeholder="Buscar vagas por título ou descrição..."
          value={busca}
          onChangeText={pesquisar}
          style={styles.inputBusca}
        />
      </View>

      {carregandoBusca && (
        <ActivityIndicator size="small" color="#2563eb" />
      )}

      {/* Lista de vagas */}
      {vagas.length === 0 ? (
        <Text style={styles.semVagas}>Nenhuma vaga encontrada.</Text>
      ) : (
        <FlatList
          data={vagas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("VagaDetalhes", { id: item.id })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={22}
                  color="#2563eb"
                />
              </View>

              <Text style={styles.descricao} numberOfLines={2}>
                {item.descricao}
              </Text>

              <View style={styles.infoRow}>
                <Ionicons name="cash-outline" size={16} color="#2563eb" />
                <Text style={styles.salario}>
                  {item.salario ? `R$ ${item.salario}` : "A combinar"}
                </Text>
              </View>
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
    padding: 14,
    backgroundColor: "#fff",
  },

  /* 🔍 Barra de busca estilo profissional */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  inputBusca: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  /* Cards */
  card: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 1,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1e293b",
    flex: 1,
  },

  descricao: {
    color: "#6b7280",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  salario: {
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 15,
    color: "#2563eb",
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
    color: "#6b7280",
  },
});
