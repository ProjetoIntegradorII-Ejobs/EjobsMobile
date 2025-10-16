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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { cadastroStyles } from "../assets/css/CadastroStyles"; 
import VagasController from "../controllers/VagasController";

export default function CadastrarVaga({ navigation }) {
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await VagasController.create();
        if (data.success) {
          setModalidades(data.modalidades || []);
          setHorarios(data.horarios || []);
          setRegimes(data.regimes || []);
          setCargos(data.cargos || []);
          setCategorias(data.categorias || []);
          setEmpresa(data.empresa || null);
          if (data.empresa) {
            handleChange("usuarioId", data.empresa.id.toString());
          }
        } else {
          Alert.alert("Erro", "Não foi possível carregar dados para cadastro de vaga");
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Erro", "Falha ao conectar com o servidor");
      }
    };
    loadData();
  }, []);

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
        Alert.alert("Erro", result.errors ? result.errors[0] : "Erro ao cadastrar vaga");
      } else {
        Alert.alert("Sucesso", "Vaga cadastrada com sucesso!");
        navigation.replace("Vagas");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
      console.error(error);
    }
  };

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
                    <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id.toString()} />
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
