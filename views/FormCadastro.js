import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastroStyles } from '../assets/css/CadastroStyles';
import CadastroController from '../controllers/CadastroController';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginController from '../controllers/LoginController';

export default function Cadastrar({ navigation }) {
  const isMounted = useRef(true);

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

  const [estados, setEstados] = useState([]);
  const [papeis, setPapeis] = useState([]);

  const [termo, setTermo] = useState('');
  const [lista, setLista] = useState([]);
  const [showList, setShowList] = useState(false);

  const buscarCidades = async (nomeCidade) => {
    if (nomeCidade.length < 2) {
      setLista([]);
      setShowList(false);
      return;
    }

    try {
      const response = await CadastroController.carregaCidades(nomeCidade);
      setLista(response);
      setShowList(true);
    } catch (error) {
      console.log('Erro ao buscar cidades:', error);
    }
  };

  global.ErrorUtils.setGlobalHandler((err, isFatal) => {
    console.warn('🚨 Erro detectado:', err.message);
    if (isFatal) {
      Alert.alert('Erro Fatal', 'O app encontrou um erro e será reiniciado.');
    }
  });

  useEffect(() => {
    isMounted.current = true;

    const loadData = async () => {
      try {
        const data = await CadastroController.create();

        if (isMounted.current && data.success) {
          setEstados(data.estados || []);
          setPapeis(data.papeis || []);
        } else if (isMounted.current) {
          Alert.alert('Erro', 'Erro ao carregar dados iniciais.');
        }
      } catch (err) {
        console.error('❌ Erro ao carregar dados iniciais:', err);
        if (isMounted.current) {
          Alert.alert('Erro', 'Falha ao conectar ao servidor.');
        }
      }
    };

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.nome || !formData.email || !formData.senha) {
      return Alert.alert('Erro', 'Preencha os campos obrigatórios.');
    }

    if (formData.senha !== formData.conf_senha) {
      return Alert.alert('Erro', 'As senhas não conferem.');
    }

    // RN 11 - A senha de um usuário deve possuir no mínimo 6 caracteres e um caracter especial
    if (formData.senha.length < 6) {
      return Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
    }

    const regexEspecial = /[^A-Za-z0-9]/;
    if (!regexEspecial.test(formData.senha)) {
      return Alert.alert(
        'Erro',
        'A senha deve conter ao menos um caractere especial.'
      );
    }

    try {
      const result = await CadastroController.register(formData);

      if (!result.success) {
        return Alert.alert(
          'Erro',
          result.errors ? result.errors[0] : 'Erro ao cadastrar.'
        );
      }

      Alert.alert('Sucesso', 'Cadastro realizado!');

      const loginResult = await LoginController.login(
        formData.email,
        formData.senha
      );

      if (loginResult.success && loginResult.usuario) {
        await AsyncStorage.setItem(
          'usuarioLogado',
          JSON.stringify(loginResult.usuario)
        );

        const tipo = loginResult.usuario.tipo;
        navigation.replace(tipo === 3 ? 'Empresa' : 'UsuarioComum');
      } else {
        Alert.alert('Erro', 'Falha no login automático.');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      Alert.alert('Erro', 'Falha ao conectar ao servidor.');
    }
  };

  return (
    <SafeAreaView style={cadastroStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            cadastroStyles.scrollContent,
            { paddingBottom: 60 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={cadastroStyles.header}>
            <Text style={cadastroStyles.title}>Cadastro de Usuário</Text>
          </View>

          <View style={cadastroStyles.formContainer}>
            <Text style={cadastroStyles.sectionTitle}>
              Preencha os dados abaixo
            </Text>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>
                Papel<Text style={cadastroStyles.requiredIndicator}> *</Text>
              </Text>
              <View style={cadastroStyles.pickerContainer}>
                <Picker
                  selectedValue={formData.tipoUsuario}
                  onValueChange={(value) => handleChange('tipoUsuario', value)}
                  style={cadastroStyles.picker}
                >
                  <Picker.Item label="Selecione" value="" />
                  {papeis.map((papel) => (
                    <Picker.Item
                      key={papel.id}
                      label={papel.nome}
                      value={papel.id.toString()}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* NOME */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Nome</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe seu nome"
                value={formData.nome}
                onChangeText={(txt) => handleChange('nome', txt)}
              />
            </View>

            {/* EMAIL */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Email</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(txt) => handleChange('email', txt)}
              />
            </View>

            {/* SENHA */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Senha</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe a senha"
                secureTextEntry
                value={formData.senha}
                onChangeText={(txt) => handleChange('senha', txt)}
              />
            </View>

            {/* CONFIRMAR SENHA */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Confirmar senha</Text>
              <TextInput
                style={cadastroStyles.input}
                secureTextEntry
                placeholder="Confirme a senha"
                value={formData.conf_senha}
                onChangeText={(txt) => handleChange('conf_senha', txt)}
              />
            </View>

            {/* DOCUMENTO */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Documento</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="CPF ou CNPJ"
                value={formData.documento}
                onChangeText={(txt) => handleChange('documento', txt)}
              />
            </View>

            {/* TELEFONE */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Telefone</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="DDD + número"
                keyboardType="phone-pad"
                value={formData.telefone}
                onChangeText={(txt) => handleChange('telefone', txt)}
              />
            </View>

            {/* CIDADE (autocomplete) */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Cidade</Text>

              <View style={{ position: 'relative' }}>
                <TextInput
                  style={cadastroStyles.input}
                  placeholder="Digite a cidade"
                  value={termo}
                  onChangeText={(texto) => {
                    setTermo(texto);
                    buscarCidades(texto);
                  }}
                />

                {showList && lista.length > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 55,
                      left: 0,
                      right: 0,
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      maxHeight: 180,
                      zIndex: 100,
                      elevation: 10,
                    }}
                  >
                    <ScrollView nestedScrollEnabled>
                      {lista.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={{ padding: 12 }}
                          onPress={() => {
                            setTermo(`${item.nome} - ${item.uf}`);
                            setFormData((prev) => ({
                              ...prev,
                              cidade: item.id,
                              estado: item.codigo_uf,
                            }));
                            setShowList(false);
                          }}
                        >
                          <Text>
                            {item.nome} - {item.uf}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>

            {/* ENDEREÇO */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Logradouro</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Rua / Avenida"
                value={formData.endLogradouro}
                onChangeText={(txt) => handleChange('endLogradouro', txt)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Bairro</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Bairro"
                value={formData.endBairro}
                onChangeText={(txt) => handleChange('endBairro', txt)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Número</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Número"
                keyboardType="numeric"
                value={formData.endNumero}
                onChangeText={(txt) => handleChange('endNumero', txt)}
              />
            </View>

            {/* DESCRIÇÃO */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Descrição</Text>
              <TextInput
                style={[cadastroStyles.input, { height: 70 }]}
                placeholder="Descrição "
                multiline
                value={formData.descricao}
                onChangeText={(txt) => handleChange('descricao', txt)}
              />
            </View>

            {/* BOTÃO */}
            <TouchableOpacity
              style={[cadastroStyles.button, cadastroStyles.saveButton]}
              onPress={handleRegister}
            >
              <Text style={cadastroStyles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 16, alignItems: 'center' }}>
              <Text>
                Já tem conta?{' '}
                <Text
                  style={{ color: '#2563eb', fontWeight: 'bold' }}
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
