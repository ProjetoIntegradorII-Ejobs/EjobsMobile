import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuarioController from "../controllers/UsuarioController";

export default function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    documento: "",
    descricao: "",
  });

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("usuarioLogado");
      if (dados) {
        const user = JSON.parse(dados);
        setUsuario(user);

        setEmail(user.email || "");

        setForm({
          nome: user.nome || "",
          telefone: user.telefone || "",
          documento: user.documento || "",
          descricao: user.descricao || "",
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

    const dadosAtualizados = {
      id: usuario.id,
      nome: form.nome,
      telefone: form.telefone,
      descricao: form.descricao,
      documento: usuario.documento, 
    };

    try {
      const result = await UsuarioController.update(dadosAtualizados);

      if (!result.success) {
        Alert.alert("Erro", result.errors?.[0] || "Falha ao atualizar.");
      } else {
        const novoUsuario = { ...usuario, ...dadosAtualizados };

        await AsyncStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
        setUsuario(novoUsuario);

        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na comunicação com o servidor.");
      console.error(error);
    } finally {
      setSalvando(false);
    }
  };

  if (!usuario) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Carregando dados...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <Text style={styles.title}>Editar Perfil</Text>

          {/* EMAIL BLOQUEADO */}
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="Email"
            value={email}
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={form.nome}
            onChangeText={(v) => handleChange("nome", v)}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={form.telefone}
            onChangeText={(v) => handleChange("telefone", v)}
          />

          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="Documento (CPF/CNPJ)"
            value={form.documento}
            editable={false}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição (opcional)"
            value={form.descricao}
            onChangeText={(v) => handleChange("descricao", v)}
            multiline
            numberOfLines={4}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },

  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  disabledInput: {
    backgroundColor: "#e5e7eb",
    color: "#6b7280",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  backText: {
    marginTop: 15,
    color: "#2563eb",
    textAlign: "center",
    fontWeight: "bold",
  },
});
