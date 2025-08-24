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

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setShowError(true);
      return;
    }
    console.log('Login attempt:', { email, password });
    setShowError(false);
  };

  const handleRegister = () => {
    console.log('Navigate to register');
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
                <Text style={loginStyles.errorText}>Preencha todos os campos</Text>
              </View>
            )}

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Email</Text>
              <View style={loginStyles.inputWrapper}>
                <Text style={loginStyles.inputIcon}>📧</Text>
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