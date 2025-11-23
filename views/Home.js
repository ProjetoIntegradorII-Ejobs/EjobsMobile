import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2563eb" barStyle="light-content" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>EJobs Mobile</Text>
        <Text style={styles.subtitle}>
          Conectando você às melhores oportunidades
        </Text>

        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
          }}
          style={styles.image}
        />
      </View>

      {/* Botões Principais */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <Text style={styles.buttonPrimaryText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Vagas")}
        >
          <Ionicons name="briefcase-outline" size={20} color="#2563eb" />
          <Text style={styles.buttonSecondaryText}>Vizualizar Vagas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("FormCadastro")}
        >
          <Ionicons name="person-add-outline" size={20} color="#2563eb" />
          <Text style={styles.buttonSecondaryText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 25,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },

  subtitle: {
    fontSize: 15,
    color: "#4b5563",
    marginTop: 5,
    textAlign: "center",
  },

  image: {
    width: 140,
    height: 140,
    marginTop: 20,
    opacity: 0.9,
  },

  buttonContainer: {
    marginTop: 20,
  },

  buttonPrimary: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonPrimaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 8,
  },

  buttonSecondary: {
    padding: 15,
    borderWidth: 2,
    borderColor: "#2563eb",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  buttonSecondaryText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2563eb",
    marginLeft: 8,
  },
});
