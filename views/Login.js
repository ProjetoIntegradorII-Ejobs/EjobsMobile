import React, { useState } from 'react';
import { 
  Text, 
  View, 
  KeyboardAvoidingView, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';
import { loginStyles } from '../assets/css/LoginStyles';
import LoginController from '../controllers/LoginController';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setShowError(true);
      setErrorMessage('Preencha todos os campos');
      return;
    }

    try {
      const result = await LoginController.login(email, password);

      if (!result.success) {
        setShowError(true);
        setErrorMessage(result.errors?.[0] || 'Erro ao fazer login');
      } else {
        setShowError(false);
        await AsyncStorage.setItem('usuarioLogado', JSON.stringify(result.usuario));
        console.log('Usuário salvo com sucesso:', result.usuario);

        if (result.usuario && result.usuario.tipo === 1) {
          navigation.replace('UsuarioComum');
        } else {
          navigation.replace('Home');
        }
      }
    } catch (error) {
      console.error('Erro ao tentar logar:', error);
      setShowError(true);
      setErrorMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyles.container}
      >
        <ScrollView contentContainerStyle={loginStyles.mainContent}>
          <View style={loginStyles.loginCard}>
            <Text style={loginStyles.loginTitle}>Bem-vindo ao E-Jobs</Text>
            <Text style={loginStyles.loginSubtitle}>Faça login para continuar</Text>

            {showError && (
              <View style={loginStyles.errorContainer}>
                <Text style={loginStyles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Email</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Informe seu email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Senha</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Informe sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={loginStyles.loginButton} onPress={handleLogin}>
              <Text style={loginStyles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={loginStyles.registerContainer}>
              <Text style={loginStyles.registerText}>
                Não tem uma conta?{' '}
                <Text style={loginStyles.registerLink} onPress={() => navigation.navigate('FormCadastro')}>
                  Cadastre-se
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
