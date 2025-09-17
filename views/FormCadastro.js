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
import { registerStyles } from '../assets/css/CadastroStyles';
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
    // Validação básica
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={registerStyles.mainContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={registerStyles.registerCard}>
            <Text style={registerStyles.registerTitle}>Cadastro de Usuário</Text>
            <Text style={registerStyles.registerSubtitle}>Preencha os dados abaixo</Text>

            {/* Nome */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Nome</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Informe o nome"
                value={formData.nome}
                onChangeText={text => handleChange('nome', text)}
              />
            </View>

            {/* Email */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Email</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Informe o email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
            </View>

            {/* Senha */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Senha</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Informe a senha"
                secureTextEntry
                value={formData.senha}
                onChangeText={text => handleChange('senha', text)}
              />
            </View>

            {/* Confirmação de senha */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Confirme a Senha</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Repita a senha"
                secureTextEntry
                value={formData.conf_senha}
                onChangeText={text => handleChange('conf_senha', text)}
              />
            </View>

            {/* Documento */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Documento</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Informe CPF ou CNPJ"
                value={formData.documento}
                onChangeText={text => handleChange('documento', text)}
              />
            </View>

            {/* Telefone */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Telefone</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Informe o telefone"
                keyboardType="phone-pad"
                value={formData.telefone}
                onChangeText={text => handleChange('telefone', text)}
              />
            </View>

            {/* Endereço */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Endereço</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Logradouro"
                value={formData.endLogradouro}
                onChangeText={text => handleChange('endLogradouro', text)}
              />
              <TextInput
                style={registerStyles.input}
                placeholder="Bairro"
                value={formData.endBairro}
                onChangeText={text => handleChange('endBairro', text)}
              />
              <TextInput
                style={registerStyles.input}
                placeholder="Número"
                value={formData.endNumero}
                onChangeText={text => handleChange('endNumero', text)}
              />
            </View>

            {/* Descrição */}
            <View style={registerStyles.inputContainer}>
              <Text style={registerStyles.inputLabel}>Descrição</Text>
              <TextInput
                style={[registerStyles.input, { height: 80 }]}
                placeholder="Informe uma descrição"
                multiline
                value={formData.descricao}
                onChangeText={text => handleChange('descricao', text)}
              />
            </View>

            <TouchableOpacity style={registerStyles.registerButton} onPress={handleRegister}>
              <Text style={registerStyles.registerButtonText}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={registerStyles.loginContainer}>
              <Text style={registerStyles.loginText}>
                Já tem conta?{' '}
                <Text 
                  style={registerStyles.loginLink} 
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