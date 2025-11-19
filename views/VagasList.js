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

  // Função de pesquisa
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
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Campo de busca */}
      <TextInput
        placeholder="Buscar vaga..."
        value={busca}
        onChangeText={pesquisar}
        style={styles.inputBusca}
      />

      {/* Indicador de carregamento da busca */}
      {carregandoBusca && <ActivityIndicator size="small" color="#2563eb" />}

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
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text numberOfLines={2}>{item.descricao}</Text>
              <Text style={styles.salario}>Salário: R$ {item.salario}</Text>
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

  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },

  salario: {
    marginTop: 5,
    fontWeight: "600",
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
