import { useFocusEffect } from "@react-navigation/native";
import Navbar from "../components/NavBar";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

 const handleLogout = () => {
  Alert.alert(
    "Sair",
    "Deseja encerrar sua sessão?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("usuarioLogado");
          navigation.replace("Home");
        },
      },
    ]
  );
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#2563eb" barStyle="light-content" />

      {/* SCROLL PRINCIPAL */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Olá,</Text>
              <Text style={styles.userNameHeader}>
                {usuario?.nome?.split(" ")[0] || "Usuário"}
              </Text>
            </View>

            <Image
              style={styles.avatar}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
              }}
            />
          </View>

          {/* SUBHEADER */}
          <View style={styles.subheader}>
            <Text style={styles.subtitle}>
              Gerencie sua jornada profissional
            </Text>
          </View>

          {/* MENU DE OPÇÕES */}
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate("Vagas")}
            >
              <Ionicons name="briefcase-outline" size={35} color="#2563eb" />
              <Text style={styles.menuTitle}>Explorar Vagas</Text>
              <Text style={styles.menuDesc}>Veja oportunidades disponíveis</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate("MinhasCandidaturas")}
            >
              <Ionicons name="document-text-outline" size={35} color="#2563eb" />
              <Text style={styles.menuTitle}>Minhas Candidaturas</Text>
              <Text style={styles.menuDesc}>Acompanhe seu progresso</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate("Perfil")}
            >
              <Ionicons name="person-outline" size={35} color="#2563eb" />
              <Text style={styles.menuTitle}>Meu Perfil</Text>
              <Text style={styles.menuDesc}>Editar informações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuCard, { borderColor: "#dc2626" }]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={35} color="#dc2626" />
              <Text style={[styles.menuTitle, { color: "#dc2626" }]}>Sair</Text>
              <Text style={[styles.menuDesc, { color: "#dc2626" }]}>
                Encerrar sessão
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* NAVBAR FIXA */}
      <SafeAreaView edges={["bottom"]}>
        <Navbar navigation={navigation} />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2563eb",
  },

  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#2563eb",
  },

  greeting: {
    color: "#e0e7ff",
    fontSize: 16,
  },

  userNameHeader: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -3,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },

  subheader: {
    marginTop: 12,
    paddingHorizontal: 20,
  },

  subtitle: {
    fontSize: 15,
    color: "#475569",
  },

  menuContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  menuCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 2,
  },

  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1e293b",
  },

  menuDesc: {
    marginTop: 3,
    fontSize: 13,
    color: "#64748b",
  },
});
