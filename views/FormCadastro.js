import React, { useState } from 'react';
import { 
  Text, 
  View, 
  KeyboardAvoidingView, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Platform,
  Alert
} from 'react-native';
import { cadastroStyles } from '../assets/css/CadastroStyles';
import CadastroController from '../controllers/CadastroController';

export default function Cadastrar({ navigation }) {
  const [formData, setFormData] = useState({
    tipoUsuario: '',
    nome: '',
    email: '',
    senha: '',
    conf_senha: '',
    documento: '',
    descricao: '',
    estado: '',
    cidade: '',
    endLogradouro: '',
    endBairro: '',
    endNumero: '',
    telefone: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.conf_senha) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios');
      return;
    }

    if (formData.senha !== formData.conf_senha) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    try {
      const result = await CadastroController.register(formData);

      if (!result.success) {
        Alert.alert('Erro', result.errors ? result.errors[0] : 'Erro ao cadastrar usuário');
      } else {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.replace('Login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={cadastroStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={cadastroStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cabeçalho */}
          <View style={cadastroStyles.header}>
            <Text style={cadastroStyles.title}>Cadastro de Usuário</Text>
          </View>

          {/* Card de formulário */}
          <View style={cadastroStyles.formContainer}>
            <Text style={cadastroStyles.sectionTitle}>Preencha os dados abaixo</Text>

            {/* Nome */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Nome</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o nome"
                value={formData.nome}
                onChangeText={text => handleChange('nome', text)}
              />
            </View>

            {/* Email */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Email</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
            </View>

            {/* Senha */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Senha</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe a senha"
                secureTextEntry
                value={formData.senha}
                onChangeText={text => handleChange('senha', text)}
              />
            </View>

            {/* Confirmação de senha */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Confirme a Senha</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Repita a senha"
                secureTextEntry
                value={formData.conf_senha}
                onChangeText={text => handleChange('conf_senha', text)}
              />
            </View>

            {/* Documento */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Documento</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe CPF ou CNPJ"
                value={formData.documento}
                onChangeText={text => handleChange('documento', text)}
              />
            </View>

            {/* Telefone */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Telefone</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o telefone"
                keyboardType="phone-pad"
                value={formData.telefone}
                onChangeText={text => handleChange('telefone', text)}
              />
            </View>

            {/* Endereço */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Endereço</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Logradouro"
                value={formData.endLogradouro}
                onChangeText={text => handleChange('endLogradouro', text)}
              />
              <TextInput
                style={cadastroStyles.input}
                placeholder="Bairro"
                value={formData.endBairro}
                onChangeText={text => handleChange('endBairro', text)}
              />
              <TextInput
                style={cadastroStyles.input}
                placeholder="Número"
                value={formData.endNumero}
                onChangeText={text => handleChange('endNumero', text)}
              />
            </View>

            {/* Descrição */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Descrição</Text>
              <TextInput
                style={[cadastroStyles.input, cadastroStyles.textArea]}
                placeholder="Informe uma descrição"
                multiline
                value={formData.descricao}
                onChangeText={text => handleChange('descricao', text)}
              />
            </View>

            {/* Botão Cadastrar */}
            <TouchableOpacity 
              style={[cadastroStyles.button, cadastroStyles.saveButton]} 
              onPress={handleRegister}
            >
              <Text style={cadastroStyles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            {/* Link para login */}
            <View style={{ marginTop: 16, alignItems: 'center' }}>
              <Text>
                Já tem conta?{' '}
                <Text 
                  style={{ color: '#2563eb', fontWeight: '700' }} 
                  onPress={() => navigation.navigate('Login')}
                >
                  Faça login
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
