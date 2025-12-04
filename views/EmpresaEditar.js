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

export default function EmpresaEditar({ navigation }) {
  const [empresa, setEmpresa] = useState(null);
  const [email, setEmail] = useState("");

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    documento: "",
    descricao: "",
  });

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      const dados = await AsyncStorage.getItem("usuarioLogado");

      if (dados) {
        const emp = JSON.parse(dados);

        setEmpresa(emp);
        setEmail(emp.email);

        setForm({
          nome: emp.nome || "",
          telefone: emp.telefone || "",
          documento: emp.documento || "",
          descricao: emp.descricao || "",
        });
      }
    };

    carregar();
  }, []);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSalvar = async () => {
    if (!empresa) return;
    setSalvando(true);

    const dadosAtualizados = {
      id: empresa.id,
      nome: form.nome,
      telefone: form.telefone,
      documento: form.documento,
      descricao: form.descricao,
    };

    try {
      const result = await UsuarioController.update(dadosAtualizados);

      if (!result.success) {
        Alert.alert("Erro", result.errors?.[0] || "Falha ao atualizar dados.");
      } else {
        const novo = { ...empresa, ...dadosAtualizados };

        await AsyncStorage.setItem("usuarioLogado", JSON.stringify(novo));
        setEmpresa(novo);

        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Falha na comunicação com o servidor.");
    } finally {
      setSalvando(false);
    }
  };

  if (!empresa) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Carregando dados...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Perfil da Empresa</Text>

      <TextInput
        style={[styles.input, styles.disabled]}
        value={email}
        editable={false}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        value={form.nome}
        onChangeText={(v) => handleChange("nome", v)}
        placeholder="Nome / Razão Social"
      />

      <TextInput
        style={styles.input}
        value={form.telefone}
        onChangeText={(v) => handleChange("telefone", v)}
        placeholder="Telefone"
        keyboardType="phone-pad"
      />

      <TextInput
        style={[styles.input, styles.disabled]}
        value={form.documento}
        editable={false}
        placeholder="CNPJ"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        value={form.descricao}
        onChangeText={(v) => handleChange("descricao", v)}
        placeholder="Descrição da Empresa"
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
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  center: { flex: 1, alignItems: "center", justifyContent: "center" },

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
    marginBottom: 12,
  },

  disabled: {
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  voltar: {
    marginTop: 15,
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "bold",
  },
});
