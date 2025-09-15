import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../assets/css/GlobalStyles';
import { cadastroStyles } from '../assets/css/CadastroStyles';
import api from '../config/api';

export default function Cadastro({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [papeis, setPapeis] = useState([
    { id: 1, nome: 'Candidato' },
    { id: 3, nome: 'Empresa' }
  ]);

  
  const [formData, setFormData] = useState({
    papel: '',
    nome: '',
    email: '',
    senha: '',
    confSenha: '',
    documento: '',
    descricao: '',
    estado: '',
    cidade: '',
    endLogradouro: '',
    bairro: '',
    numero: '',
    telefone: '',
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    carregarEstados();
  }, []);

  const carregarEstados = async () => {
    try {
      // Simulando dados de estados - você pode integrar com a API real
      const estadosMock = [
        { codigoUf: 'PR', nome: 'Paraná' },
        { codigoUf: 'SP', nome: 'São Paulo' },
        { codigoUf: 'RJ', nome: 'Rio de Janeiro' },
        { codigoUf: 'MG', nome: 'Minas Gerais' },
        { codigoUf: 'RS', nome: 'Rio Grande do Sul' },
      ];
      setEstados(estadosMock);
    } catch (error) {
      console.error('Erro ao carregar estados:', error);
    }
  };

  const carregarCidades = async (estadoId) => {
    if (!estadoId) {
      setCidades([]);
      return;
    }

    try {
      // Simulando dados de cidades - você pode integrar com a API real
      const cidadesMock = {
        'PR': [
          { codigoIbge: '4106902', nome: 'Curitiba' },
          { codigoIbge: '4104808', nome: 'Foz do Iguaçu' },
          { codigoIbge: '4115200', nome: 'Londrina' },
        ],
        'SP': [
          { codigoIbge: '3550308', nome: 'São Paulo' },
          { codigoIbge: '3509502', nome: 'Campinas' },
          { codigoIbge: '3518800', nome: 'Guarulhos' },
        ],
      };
      
      setCidades(cidadesMock[estadoId] || []);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Carregar cidades quando estado for selecionado
    if (field === 'estado') {
      carregarCidades(value);
      setFormData(prev => ({
        ...prev,
        cidade: '' // Limpar cidade selecionada
      }));
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.papel) novosErros.papel = 'Selecione um papel';
    if (!formData.nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) novosErros.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) novosErros.email = 'Email inválido';
    if (!formData.senha) novosErros.senha = 'Senha é obrigatória';
    else if (formData.senha.length < 6) novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
    if (!formData.confSenha) novosErros.confSenha = 'Confirmação de senha é obrigatória';
    else if (formData.senha !== formData.confSenha) novosErros.confSenha = 'Senhas não coincidem';
    if (!formData.documento.trim()) novosErros.documento = 'Documento é obrigatório';
    if (!formData.estado) novosErros.estado = 'Selecione um estado';
    if (!formData.cidade) novosErros.cidade = 'Selecione uma cidade';
    if (!formData.endLogradouro.trim()) novosErros.endLogradouro = 'Endereço é obrigatório';
    if (!formData.bairro.trim()) novosErros.bairro = 'Bairro é obrigatório';
    if (!formData.numero.trim()) novosErros.numero = 'Número é obrigatório';
    if (!formData.telefone.trim()) novosErros.telefone = 'Telefone é obrigatório';

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastro = async () => {
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      const dadosCadastro = {
        tipoUsuario: parseInt(formData.papel),
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        conf_senha: formData.confSenha,
        documento: formData.documento.trim(),
        descricao: formData.descricao.trim(),
        estado: formData.estado,
        cidade: formData.cidade,
        endLogradouro: formData.endLogradouro.trim(),
        endBairro: formData.bairro.trim(),
        endNumero: formData.numero.trim(),
        telefone: formData.telefone.trim(),
      };

      // Aqui você faria a chamada para a API real
      // const response = await api.post('/usuario/cadastro', dadosCadastro);
      
      // Simulando sucesso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Sucesso!',
        'Cadastro realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );

    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert(
        'Erro',
        'Erro ao realizar cadastro. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const limparFormulario = () => {
    setFormData({
      papel: '',
      nome: '',
      email: '',
      senha: '',
      confSenha: '',
      documento: '',
      descricao: '',
      estado: '',
      cidade: '',
      endLogradouro: '',
      bairro: '',
      numero: '',
      telefone: '',
    });
    setErrors({});
    setCidades([]);
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      <KeyboardAvoidingView 
        style={globalStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={cadastroStyles.scrollView}
          contentContainerStyle={cadastroStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={cadastroStyles.container}>
            <View style={cadastroStyles.header}>
              <Text style={cadastroStyles.title}>Cadastrar Usuário</Text>
            </View>

            <View style={cadastroStyles.formContainer}>
              {/* Seção de Dados Pessoais */}
              <Text style={cadastroStyles.sectionTitle}>Dados Pessoais</Text>
              
              <View style={cadastroStyles.row}>
                {/* Coluna Esquerda */}
                <View style={cadastroStyles.column}>
                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Papel<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <View style={cadastroStyles.pickerContainer}>
                      <Picker
                        selectedValue={formData.papel}
                        onValueChange={(value) => handleInputChange('papel', value)}
                        style={cadastroStyles.picker}
                      >
                        <Picker.Item label="Selecione o papel" value="" />
                        {papeis.map((papel) => (
                          <Picker.Item key={papel.id} label={papel.nome} value={papel.id.toString()} />
                        ))}
                      </Picker>
                    </View>
                    {errors.papel && <Text style={cadastroStyles.errorText}>{errors.papel}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Nome<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.nome && cadastroStyles.inputError,
                        focusedField === 'nome' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe o nome"
                      value={formData.nome}
                      onChangeText={(value) => handleInputChange('nome', value)}
                      onFocus={() => handleFocus('nome')}
                      onBlur={handleBlur}
                      maxLength={70}
                      autoCapitalize="words"
                    />
                    {errors.nome && <Text style={cadastroStyles.errorText}>{errors.nome}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Email<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.email && cadastroStyles.inputError,
                        focusedField === 'email' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe o email"
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      maxLength={100}
                    />
                    {errors.email && <Text style={cadastroStyles.errorText}>{errors.email}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Senha<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.senha && cadastroStyles.inputError,
                        focusedField === 'senha' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe a senha"
                      value={formData.senha}
                      onChangeText={(value) => handleInputChange('senha', value)}
                      onFocus={() => handleFocus('senha')}
                      onBlur={handleBlur}
                      secureTextEntry
                      maxLength={15}
                    />
                    {errors.senha && <Text style={cadastroStyles.errorText}>{errors.senha}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Confirmação da senha<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.confSenha && cadastroStyles.inputError,
                        focusedField === 'confSenha' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe a confirmação da senha"
                      value={formData.confSenha}
                      onChangeText={(value) => handleInputChange('confSenha', value)}
                      onFocus={() => handleFocus('confSenha')}
                      onBlur={handleBlur}
                      secureTextEntry
                      maxLength={15}
                    />
                    {errors.confSenha && <Text style={cadastroStyles.errorText}>{errors.confSenha}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Documento<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.documento && cadastroStyles.inputError,
                        focusedField === 'documento' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe o documento"
                      value={formData.documento}
                      onChangeText={(value) => handleInputChange('documento', value)}
                      onFocus={() => handleFocus('documento')}
                      onBlur={handleBlur}
                      maxLength={20}
                    />
                    {errors.documento && <Text style={cadastroStyles.errorText}>{errors.documento}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>Descrição</Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        cadastroStyles.textArea,
                        focusedField === 'descricao' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe a descrição"
                      value={formData.descricao}
                      onChangeText={(value) => handleInputChange('descricao', value)}
                      onFocus={() => handleFocus('descricao')}
                      onBlur={handleBlur}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                    />
                  </View>
              </View>

                {/* Coluna Direita */}
                <View style={cadastroStyles.column}>
                  {/* Seção de Endereço */}
                  <Text style={cadastroStyles.sectionTitle}>Endereço</Text>
                  
                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Estado<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <View style={cadastroStyles.pickerContainer}>
                      <Picker
                        selectedValue={formData.estado}
                        onValueChange={(value) => handleInputChange('estado', value)}
                        style={cadastroStyles.picker}
                      >
                        <Picker.Item label="Selecione o estado" value="" />
                        {estados.map((estado) => (
                          <Picker.Item key={estado.codigoUf} label={estado.nome} value={estado.codigoUf} />
                        ))}
                      </Picker>
                    </View>
                    {errors.estado && <Text style={cadastroStyles.errorText}>{errors.estado}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Cidade<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <View style={cadastroStyles.pickerContainer}>
                      <Picker
                        selectedValue={formData.cidade}
                        onValueChange={(value) => handleInputChange('cidade', value)}
                        style={cadastroStyles.picker}
                        enabled={cidades.length > 0}
                      >
                        <Picker.Item label="Selecione a cidade" value="" />
                        {cidades.map((cidade) => (
                          <Picker.Item key={cidade.codigoIbge} label={cidade.nome} value={cidade.codigoIbge} />
                        ))}
                      </Picker>
                    </View>
                    {errors.cidade && <Text style={cadastroStyles.errorText}>{errors.cidade}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Endereço Logradouro<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.endLogradouro && cadastroStyles.inputError,
                        focusedField === 'endLogradouro' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe o Endereço Logradouro"
                      value={formData.endLogradouro}
                      onChangeText={(value) => handleInputChange('endLogradouro', value)}
                      onFocus={() => handleFocus('endLogradouro')}
                      onBlur={handleBlur}
                      maxLength={50}
                      autoCapitalize="words"
                    />
                    {errors.endLogradouro && <Text style={cadastroStyles.errorText}>{errors.endLogradouro}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Bairro<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.bairro && cadastroStyles.inputError,
                        focusedField === 'bairro' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe o Bairro"
                      value={formData.bairro}
                      onChangeText={(value) => handleInputChange('bairro', value)}
                      onFocus={() => handleFocus('bairro')}
                      onBlur={handleBlur}
                      maxLength={30}
                      autoCapitalize="words"
                    />
                    {errors.bairro && <Text style={cadastroStyles.errorText}>{errors.bairro}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Número<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.numero && cadastroStyles.inputError,
                        focusedField === 'numero' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe o Número"
                      value={formData.numero}
                      onChangeText={(value) => handleInputChange('numero', value)}
                      onFocus={() => handleFocus('numero')}
                      onBlur={handleBlur}
                      maxLength={10}
                      keyboardType="numeric"
                    />
                    {errors.numero && <Text style={cadastroStyles.errorText}>{errors.numero}</Text>}
                  </View>

                  <View style={cadastroStyles.inputGroup}>
                    <Text style={cadastroStyles.label}>
                      Telefone<Text style={cadastroStyles.requiredIndicator}> *</Text>
                    </Text>
                    <TextInput
                      style={[
                        cadastroStyles.input, 
                        errors.telefone && cadastroStyles.inputError,
                        focusedField === 'telefone' && cadastroStyles.inputFocused
                      ]}
                      placeholder="Informe o Telefone"
                      value={formData.telefone}
                      onChangeText={(value) => handleInputChange('telefone', value)}
                      onFocus={() => handleFocus('telefone')}
                      onBlur={handleBlur}
                      keyboardType="phone-pad"
                      maxLength={20}
                    />
                    {errors.telefone && <Text style={cadastroStyles.errorText}>{errors.telefone}</Text>}
                  </View>
                </View>
            </View>

              {/* Botões */}
              <View style={cadastroStyles.buttonContainer}>
                <TouchableOpacity
                  style={[cadastroStyles.button, cadastroStyles.saveButton]}
                  onPress={handleCadastro}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <View style={cadastroStyles.loadingContainer}>
                      <ActivityIndicator color="#fff" size="small" />
                      <Text style={cadastroStyles.loadingText}>Salvando...</Text>
                    </View>
                  ) : (
                    <Text style={cadastroStyles.buttonText}>Salvar</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[cadastroStyles.button, cadastroStyles.clearButton]}
                  onPress={limparFormulario}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={[cadastroStyles.buttonText, cadastroStyles.clearButtonText]}>Limpar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[cadastroStyles.button, cadastroStyles.backButton]}
                  onPress={() => navigation.goBack()}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={[cadastroStyles.buttonText, cadastroStyles.backButtonText]}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
