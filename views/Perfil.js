import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuarioController from "../controllers/UsuarioController";

export default function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("usuarioLogado");
      if (dados) {
        const usuarioData = JSON.parse(dados);
        setUsuario(usuarioData);
        setForm({
          nome: usuarioData.nome || "",
          email: usuarioData.email || "",
          telefone: usuarioData.telefone || "",
        });
      }
    };
    carregarUsuario();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSalvar = async () => {
    if (!usuario) return;
    setSalvando(true);

    const dadosAtualizados = { ...usuario, ...form };

    try {
      const result = await UsuarioController.update(dadosAtualizados);

      if (!result.success) {
        Alert.alert("Erro", result.errors?.[0] || "Falha ao atualizar usuário.");
      } else {
        // Atualiza o estado local e o AsyncStorage
        setUsuario(result.usuario);
        await AsyncStorage.setItem(
          "usuarioLogado",
          JSON.stringify(result.usuario)
        );

        // Atualiza os inputs do formulário
        setForm({
          nome: result.usuario.nome,
          email: result.usuario.email,
          telefone: result.usuario.telefone,
        });

        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha na comunicação com o servidor.");
    } finally {
      setSalvando(false);
    }
  };

  if (!usuario) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Carregando dados do usuário...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={form.nome}
        onChangeText={(v) => handleChange("nome", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={form.telefone}
        onChangeText={(v) => handleChange("telefone", v)}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={[styles.button, salvando && { opacity: 0.5 }]}
        onPress={handleSalvar}
        disabled={salvando}
      >
        <Text style={styles.buttonText}>
          {salvando ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2563eb",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  backText: {
    color: "#2563eb",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
});
