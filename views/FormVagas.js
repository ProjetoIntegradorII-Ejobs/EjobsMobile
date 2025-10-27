import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cadastroStyles } from "../assets/css/CadastroStyles";
import VagasController from "../controllers/VagasController";

export default function FormVagas({ navigation }) {
  const [formData, setFormData] = useState({
    titulo: "",
    modalidade: "",
    horario: "",
    regime: "",
    salario: "",
    descricao: "",
    requisitos: "",
    status: "Ativo",
    cargo: "",
    categoria: "",
    usuarioId: "", // empresa logada
  });

  const [modalidades, setModalidades] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [regimes, setRegimes] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

  // Atualiza valores dos inputs
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Carrega listas iniciais e ID da empresa logada
  useEffect(() => {
    const loadData = async () => {
      try {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        const empresa = JSON.parse(dados);

        if (!empresa || !empresa.id) {
          Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
          navigation.navigate("Login");
          return;
        }

        console.log("📦 Empresa logada:", empresa);

        const data = await VagasController.create({ usuarioId: empresa.id });

        if (data.success) {
          console.log("✅ Dados carregados do backend:", data);

          setModalidades(data.modalidades || []);
          setHorarios(data.horarios || []);
          setRegimes(data.regimes || []);
          setCargos(data.cargos || []);
          setCategorias(data.categorias || []);
          setEmpresa(data.empresa || null);

          if (data.empresa) handleChange("usuarioId", data.empresa.id.toString());
        } else {
          console.log("⚠️ Erro ao carregar dados:", data.errors);
          Alert.alert("Erro", "Não foi possível carregar dados para cadastro de vaga");
        }
      } catch (err) {
        console.error("❌ Erro ao conectar com o servidor:", err);
        Alert.alert("Erro", "Falha na comunicação com o servidor");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔹 Função para cadastrar a vaga
  const handleRegister = async () => {
    if (
      !formData.titulo ||
      !formData.modalidade ||
      !formData.horario ||
      !formData.regime ||
      !formData.cargo ||
      !formData.categoria ||
      !formData.descricao
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const result = await VagasController.cadastrar(formData);

      if (!result.success) {
        console.error("⚠️ Erro ao cadastrar vaga:", result);
        Alert.alert("Erro", result.errors ? result.errors[0] : "Erro ao cadastrar vaga");
      } else {
        Alert.alert("Sucesso", "Vaga cadastrada com sucesso!");
        navigation.replace("Empresa");
      }
    } catch (error) {
      console.error("❌ Erro na requisição:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  };

  // 🔹 Exibe carregamento
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={cadastroStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={cadastroStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={cadastroStyles.header}>
            <Text style={cadastroStyles.title}>Cadastro de Vaga</Text>
          </View>

          <View style={cadastroStyles.formContainer}>
            {/* Título */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>
                Título<Text style={cadastroStyles.requiredIndicator}> *</Text>
              </Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Título da vaga"
                value={formData.titulo}
                onChangeText={(text) => handleChange("titulo", text)}
              />
            </View>

            {/* Modalidade */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Modalidade</Text>
              <View style={cadastroStyles.pickerContainer}>
                <Picker
                  selectedValue={formData.modalidade}
                  onValueChange={(value) => handleChange("modalidade", value)}
                  style={cadastroStyles.picker}
                >
                  <Picker.Item label="Selecione" value="" />
                  {modalidades.map((item, idx) => (
                    <Picker.Item key={idx} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Horário */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Horário</Text>
              <View style={cadastroStyles.pickerContainer}>
                <Picker
                  selectedValue={formData.horario}
                  onValueChange={(value) => handleChange("horario", value)}
                  style={cadastroStyles.picker}
                >
                  <Picker.Item label="Selecione" value="" />
                  {horarios.map((item, idx) => (
                    <Picker.Item key={idx} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Regime */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Regime</Text>
              <View style={cadastroStyles.pickerContainer}>
                <Picker
                  selectedValue={formData.regime}
                  onValueChange={(value) => handleChange("regime", value)}
                  style={cadastroStyles.picker}
                >
                  <Picker.Item label="Selecione" value="" />
                  {regimes.map((item, idx) => (
                    <Picker.Item key={idx} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Salário */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Salário</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Ex: 3000.00"
                keyboardType="numeric"
                value={formData.salario}
                onChangeText={(text) => handleChange("salario", text)}
              />
            </View>

            {/* Cargo */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Cargo</Text>
              <View style={cadastroStyles.pickerContainer}>
                <Picker
                  selectedValue={formData.cargo}
                  onValueChange={(value) => handleChange("cargo", value)}
                  style={cadastroStyles.picker}
                >
                  <Picker.Item label="Selecione o cargo" value="" />
                  {cargos.map((cargo) => (
                    <Picker.Item key={cargo.id} label={cargo.nome} value={cargo.id.toString()} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Categoria */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Categoria</Text>
              <View style={cadastroStyles.pickerContainer}>
                <Picker
                  selectedValue={formData.categoria}
                  onValueChange={(value) => handleChange("categoria", value)}
                  style={cadastroStyles.picker}
                >
                  <Picker.Item label="Selecione a categoria" value="" />
                  {categorias.map((categoria) => (
                    <Picker.Item
                      key={categoria.id}
                      label={categoria.nome}
                      value={categoria.id.toString()}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Descrição */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>
                Descrição<Text style={cadastroStyles.requiredIndicator}> *</Text>
              </Text>
              <TextInput
                style={[cadastroStyles.input, { height: 100, textAlignVertical: "top" }]}
                placeholder="Descrição da vaga"
                multiline
                value={formData.descricao}
                onChangeText={(text) => handleChange("descricao", text)}
              />
            </View>

            {/* Requisitos */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Requisitos</Text>
              <TextInput
                style={[cadastroStyles.input, { height: 80, textAlignVertical: "top" }]}
                placeholder="Requisitos da vaga"
                multiline
                value={formData.requisitos}
                onChangeText={(text) => handleChange("requisitos", text)}
              />
            </View>

            {/* Botão */}
            <TouchableOpacity
              style={[cadastroStyles.button, cadastroStyles.saveButton]}
              onPress={handleRegister}
            >
              <Text style={cadastroStyles.buttonText}>Cadastrar Vaga</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
