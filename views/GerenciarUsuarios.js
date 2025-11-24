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
import AdminController from "../controllers/AdminController";

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    setLoading(true);

    const result = await AdminController.listarUsuarios();

    if (result.success && result.usuarios) {
      // Filtrando apenas CANDIDATOS (1) e EMPRESAS (3)
      const filtrados = result.usuarios.filter(
        (u) => u.tipo === 1 || u.tipo === 3
      );

      setUsuarios(filtrados);
    } else {
      Alert.alert("Erro", "Não foi possível carregar os usuários.");
    }

    setLoading(false);
  };

  const alterarStatus = (id, statusAtual) => {
  const novoStatus = statusAtual === "Ativo" ? "Inativo" : "Ativo";

  Alert.alert(
    "Alterar Status",
    `Deseja realmente ${statusAtual === "Ativo" ? "inativar" : "ativar"} este usuário?`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: async () => {
          const result = await AdminController.alterarStatusUsuario(
            id,
            novoStatus               
          );

          if (result.success) {
            Alert.alert("Sucesso", result.message);
            carregar();
          } else {
            Alert.alert("Erro", result.error || "Falha ao alterar status.");
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
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Usuários</Text>

      <View style={styles.headerRow}>
        <Text style={[styles.col, { flex: 1 }]}>ID</Text>
        <Text style={[styles.col, { flex: 3 }]}>Nome</Text>
        <Text style={[styles.col, { flex: 2 }]}>Tipo</Text>
        <Text style={[styles.col, { flex: 2 }]}>Status</Text>
        <Text style={[styles.col, { flex: 2 }]}></Text>
      </View>

      {usuarios.map((u) => (
        <View key={u.id} style={styles.row}>
          <Text style={[styles.col, { flex: 1 }]}>{u.id}</Text>
          <Text style={[styles.col, { flex: 3 }]}>{u.nome}</Text>

          <Text style={[styles.col, { flex: 2 }]}>
            {u.tipo === 1 ? "Candidato" : "Empresa"}
          </Text>

          <Text
            style={[
              styles.col,
              { flex: 2, color: u.status === "Ativo" ? "#16a34a" : "#dc2626" },
            ]}
          >
            {u.status}
          </Text>

          <TouchableOpacity
            style={[
              styles.btn,
              u.status === "Ativo" ? styles.btnVermelho : styles.btnVerde,
            ]}
            onPress={() => alterarStatus(u.id, u.status)}
          >
            <Text style={styles.btnTexto}>
              {u.status === "Ativo" ? "Inativar" : "Ativar"}
            </Text>
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderColor: "#d1d5db",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  col: {
    fontSize: 14,
    color: "#374151",
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnVermelho: { backgroundColor: "#dc2626" },
  btnVerde: { backgroundColor: "#16a34a" },
  btnTexto: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
