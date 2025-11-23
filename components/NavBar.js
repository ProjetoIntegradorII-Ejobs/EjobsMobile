import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Navbar({ navigation }) {
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    async function carregarTipo() {
      const dados = await AsyncStorage.getItem("usuarioLogado");
      console.log(dados);
      if (dados) {
        const usuarioData = JSON.parse(dados);
        setTipoUsuario(usuarioData.tipo); // "empresa" ou "candidato"
      }
    }
    carregarTipo();
  }, []);

  const handleHomePress = () => {
    if (tipoUsuario === 3) {
      navigation.navigate("Empresa");
    } else {
      navigation.navigate("UsuarioComum");
    }
  };

  const handleVagaPress = () => {
    if (tipoUsuario === 3) {
      navigation.navigate("VagasAtivas");
    } else {
      navigation.navigate("MinhasCandidaturas");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#2563eb",
        paddingVertical: 10,
      }}
    >
      {/* Home */}
      <TouchableOpacity onPress={handleHomePress}>
        <Ionicons name="home" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Ver Vagas */}
      <TouchableOpacity onPress={handleVagaPress}>
        <Ionicons name="briefcase" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Notificações */}
      <TouchableOpacity onPress={() => navigation.navigate("ListNotificacao")}>
        <Ionicons name="notifications" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <Ionicons name="person" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
