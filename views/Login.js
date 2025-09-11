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

    const result = await LoginController.login(email, password);

    if (!result.success) {
      setShowError(true);
      setErrorMessage(result.errors[0]);
    } else {
      setShowError(false);
      console.log('Login bem-sucedido:', result);

      if (result.usuario && result.usuario.tipo === 1) {
        navigation.replace('UsuarioComum');
      } else {
        navigation.replace('Home');
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyles.container}
      >
        <ScrollView 
          contentContainerStyle={loginStyles.mainContent}
          showsVerticalScrollIndicator={false}
        >
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
              <View style={loginStyles.inputWrapper}>
                <TextInput
                  style={loginStyles.input}
                  placeholder="Informe seu email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Senha</Text>
              <View style={loginStyles.inputWrapper}>
                <TextInput
                  style={loginStyles.input}
                  placeholder="Informe sua senha"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity style={loginStyles.loginButton} onPress={handleLogin}>
              <Text style={loginStyles.loginButtonText}>Entrar</Text>
              <Text style={loginStyles.loginButtonIcon}>→</Text>
            </TouchableOpacity>

            <View style={loginStyles.registerContainer}>
              <Text style={loginStyles.registerText}>
                Não tem uma conta?{' '}
                <Text style={loginStyles.registerLink} onPress={handleRegister}>
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
