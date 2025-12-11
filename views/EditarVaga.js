import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import VagasController from "../controllers/VagasController";

export default function EditarVaga({ route, navigation }) {
  const { id } = route.params;

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [modalidades, setModalidades] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [regimes, setRegimes] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    async function carregarVaga() {
      try {
        setLoading(true);
        const data = await VagasController.getVagaEdit(id);

        if (!data.success) {
          Alert.alert("Erro", "Não foi possível carregar os dados da vaga.");
          navigation.goBack();
          return;
        }

        setModalidades(data.modalidades || []);
        setHorarios(data.horarios || []);
        setRegimes(data.regimes || []);
        setCargos(data.cargos || []);
        setCategorias(data.categorias || []);

        const vaga = data.vaga;
        setFormData({
          id: vaga.id,
          titulo: vaga.titulo || "",
          modalidade: vaga.modalidade || "",
          horario: vaga.horario || "",
          regime: vaga.regime || "",
          salario: vaga.salario || "",
          descricao: vaga.descricao || "",
          requisitos: vaga.requisitos || "",
          status: vaga.status || "Ativo",
          cargo: vaga.cargo_id ? vaga.cargo_id.toString() : "",
          categoria: vaga.categoria_id ? vaga.categoria_id.toString() : "",
          usuarioId: vaga.empresa_id,
        });
      } catch (error) {
        console.error("❌ Erro ao carregar vaga:", error);
        Alert.alert("Erro", "Falha ao carregar os dados da vaga.");
      } finally {
        setLoading(false);
      }
    }

    carregarVaga();
  }, [id]);

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      const response = await VagasController.cadastrar(formData);

      if (response.success) {
        Alert.alert("Sucesso", "Vaga alterada com sucesso!");
        navigation.replace("VagasAtivas");
      } else {
        Alert.alert("Erro", response.errors?.[0] || "Falha ao salvar as alterações.");
      }
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
      Alert.alert("Erro", "Falha na comunicação com o servidor.");
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10 }}>Carregando vaga...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Editar Vaga</Text>

        <View style={styles.form}>
          {/* Título */}
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={formData.titulo}
            onChangeText={(text) => handleChange("titulo", text)}
          />

          {/* Modalidade */}
          <Text style={styles.label}>Modalidade</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.modalidade}
              onValueChange={(value) => handleChange("modalidade", value)}
            >
              <Picker.Item label="Selecione" value="" />
              {modalidades.map((m, idx) => (
                <Picker.Item key={idx} label={m} value={m} />
              ))}
            </Picker>
          </View>

          {/* Regime */}
          <Text style={styles.label}>Regime</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.regime}
              onValueChange={(value) => handleChange("regime", value)}
            >
              <Picker.Item label="Selecione" value="" />
              {regimes.map((r, idx) => (
                <Picker.Item key={idx} label={r} value={r} />
              ))}
            </Picker>
          </View>

          {/* Horário */}
          <Text style={styles.label}>Horário</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.horario}
              onValueChange={(value) => handleChange("horario", value)}
            >
              <Picker.Item label="Selecione" value="" />
              {horarios.map((h, idx) => (
                <Picker.Item key={idx} label={h} value={h} />
              ))}
            </Picker>
          </View>

          {/* Salário */}
          <Text style={styles.label}>Salário</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.salario}
            onChangeText={(text) => {
                  //RN 10 - O campo “salário” não pode receber valores negativos 
                  if (text.includes("-")) return; 
                  handleChange("salario", text);
                }}
          />

          {/* Cargo */}
          <Text style={styles.label}>Cargo</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.cargo}
              onValueChange={(value) => handleChange("cargo", value)}
            >
              <Picker.Item label="Selecione" value="" />
              {cargos.map((c) => (
                <Picker.Item key={c.id} label={c.nome} value={c.id.toString()} />
              ))}
            </Picker>
          </View>

          {/* Categoria */}
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.categoria}
              onValueChange={(value) => handleChange("categoria", value)}
            >
              <Picker.Item label="Selecione" value="" />
              {categorias.map((cat) => (
                <Picker.Item key={cat.id} label={cat.nome} value={cat.id.toString()} />
              ))}
            </Picker>
          </View>

          {/* Descrição */}
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline
            value={formData.descricao}
            onChangeText={(text) => handleChange("descricao", text)}
          />

          {/* Requisitos */}
          <Text style={styles.label}>Requisitos</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline
            value={formData.requisitos}
            onChangeText={(text) => handleChange("requisitos", text)}
          />

          {/* Botão salvar */}
          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={handleSalvar}
            disabled={salvando}
          >
            <Text style={styles.botaoTexto}>
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: { flex: 1, backgroundColor: "#fff", padding: 15 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: 20,
  },

  form: { marginBottom: 30 },

  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 12,
  },

  botaoSalvar: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
