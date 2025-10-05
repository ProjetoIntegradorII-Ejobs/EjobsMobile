import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UsuarioComum({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const carregarUsuario = async () => {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        if (dados) setUsuario(JSON.parse(dados));
      };
      carregarUsuario();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuarioLogado");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Usuário Comum Logado</Text>

      {usuario && (
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{usuario.nome}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{usuario.email}</Text>

          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.value}>{usuario.telefone}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#10b981", marginBottom: 10 }]}
        onPress={() => navigation.navigate("Perfil")}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ef4444" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  infoBox: { marginBottom: 30, alignItems: "center" },
  label: { fontWeight: "600", color: "#444" },
  value: { fontSize: 16, marginBottom: 5 },
  button: {
    padding: 12,
    borderRadius: 8,
    width: 180,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
