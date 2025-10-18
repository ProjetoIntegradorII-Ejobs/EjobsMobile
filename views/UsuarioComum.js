import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

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
      <StatusBar backgroundColor="#2563eb" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>EJobs</Text>
        {usuario && (
          <View style={styles.userBadge}>
            <Ionicons name="person-circle-outline" size={24} color="#fff" />
            <View>
              <Text style={styles.userName}>{usuario.nome}</Text>
              <Text style={styles.userType}>Candidato</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>
          Bem-vindo, {usuario?.nome?.split(" ")[0]}!
        </Text>
        <Text style={styles.subtitle}>
          Explore oportunidades e gerencie seu perfil.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2563eb" }]}
          onPress={() => navigation.navigate("Vagas")}
        >
          <Ionicons name="briefcase-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Ver Vagas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#10b981" }]}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ef4444" }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 18,
    elevation: 3,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  userBadge: { flexDirection: "row", alignItems: "center", gap: 8 },
  userName: { color: "#fff", fontWeight: "600", fontSize: 14 },
  userType: { color: "#c7d2fe", fontSize: 12 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcome: { fontSize: 22, fontWeight: "bold", color: "#111827", marginBottom: 4 },
  subtitle: { color: "#6b7280", marginBottom: 25, textAlign: "center" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    width: "80%",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
