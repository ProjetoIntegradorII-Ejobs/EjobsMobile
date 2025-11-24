import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import AdminController from "../controllers/AdminController";

export default function EmpresasPendentes({ navigation }) {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);

    const result = await AdminController.listarEmpresasPendentes();

    if (result.success) {
      setEmpresas(result.usuarios);
    } else {
      Alert.alert("Erro", "Não foi possível carregar as empresas pendentes.");
    }

    setLoading(false);
  }

  async function aprovar(id) {
    const result = await AdminController.aprovarEmpresa(id);

    if (result.success) {
      Alert.alert("Sucesso", result.message);
      carregar();
    } else {
      Alert.alert("Erro", "Falha ao aprovar empresa.");
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
      <Text style={styles.titulo}>Empresas Pendentes</Text>

      {empresas.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Nenhuma empresa pendente.
        </Text>
      )}

      {empresas.map((empresa) => (
        <View key={empresa.id} style={styles.card}>
          <Text style={styles.nome}>{empresa.nome}</Text>
          <Text style={styles.info}>📧 {empresa.email}</Text>
          <Text style={styles.info}>📄 {empresa.documento}</Text>
          <Text style={styles.info}>📞 {empresa.telefone}</Text>

          <TouchableOpacity
            style={styles.botaoAprovar}
            onPress={() => aprovar(empresa.id)}
          >
            <Text style={styles.botaoTexto}>Aprovar Empresa</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },
  titulo: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },
  card: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  info: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },
  botaoAprovar: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
