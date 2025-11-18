import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  View, 
  KeyboardAvoidingView, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  FlatList
} from 'react-native';
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
  const [cidades, setCidades] = useState([]);
  const [papeis, setPapeis] = useState([]);
  const [termo, setTermo] = useState("");
  const [lista, setLista] = useState([]);
  const [showList, setShowList] = useState(false);

  const buscarCidades = async (nomeCidade) => {
    if (nomeCidade.length < 2) {
      setLista([]);
      return;
    }

   try {
      const response = await CadastroController.carregaCidades(nomeCidade);

      setLista(response);
      setShowList(true);

    } catch (error) {
      console.log("Erro ao buscar cidades:", error);
    }
  }
  // Log global para capturar exceções silenciosas
  global.ErrorUtils.setGlobalHandler((err, isFatal) => {
    console.warn('🚨 [Global Error Handler] Erro detectado:', err.message);
    if (isFatal) {
      Alert.alert('Erro Fatal', 'O app encontrou um erro e será reiniciado.');
    }
  });

  useEffect(() => {
    isMounted.current = true;
    console.log('🟢 FormCadastro montado.');

    const loadData = async () => {
      try {
        console.log('📡 Carregando dados iniciais...');
        const data = await CadastroController.create();
        if (isMounted.current && data.success) {
          setEstados(data.estados || []);
          setPapeis(data.papeis || []);
          console.log('✅ Dados iniciais carregados com sucesso.');
        } else if (isMounted.current) {
          console.warn('⚠️ Dados não retornaram sucesso:', data);
          Alert.alert('Erro', 'Não foi possível carregar dados do cadastro');
        }
      } catch (err) {
        console.error('❌ Erro ao carregar dados iniciais:', err);
        if (isMounted.current) {
          Alert.alert('Erro', 'Não foi possível conectar ao servidor');
        }
      }
    };

    loadData();

    return () => {
      console.log('🔴 FormCadastro desmontado.');
      isMounted.current = false;
    };
  }, []);

  const handleChange = async (field, value) => {
    console.log(`✏️ Campo alterado: ${field} = ${value}`);

    setFormData(prev => ({ ...prev, [field]: value }));

  };

  const handleRegister = async () => {
    console.log('📝 Iniciando processo de cadastro...');
    if (!formData.nome || !formData.email || !formData.senha || !formData.conf_senha) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios');
      return;
    }

    if (formData.senha !== formData.conf_senha) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    try {
      console.log('📤 Enviando dados de cadastro:', formData);
      const result = await CadastroController.register(formData);
      console.log('📥 Resposta do servidor:', result);

      if (!result.success) {
        Alert.alert('Erro', result.errors ? result.errors[0] : 'Erro ao cadastrar usuário');
        return;
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

      try {
        console.log('🔐 Tentando login automático...');
        const loginResult = await LoginController.login(formData.email, formData.senha);
        console.log('📥 Resultado do login automático:', loginResult);

        if (loginResult.success && loginResult.usuario) {
          await AsyncStorage.setItem('usuarioLogado', JSON.stringify(loginResult.usuario));
          console.log('✅ Usuário logado automaticamente:', loginResult.usuario);

          const tipo = loginResult.usuario.tipo;
          if (tipo === 1) {
            navigation.replace('UsuarioComum');
          } else if (tipo === 3) {
            navigation.replace('Empresa');
          } else {
            navigation.replace('Home');
          }
        } else {
          Alert.alert('Erro', 'Não foi possível realizar login automático.');
          navigation.replace('Login');
        }
      } catch (err) {
        console.error('❌ Erro no login automático:', err);
        Alert.alert('Erro', 'Falha ao realizar login automático.');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('❌ Erro geral no cadastro:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
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
          <View style={cadastroStyles.header}>
            <Text style={cadastroStyles.title}>Cadastro de Usuário</Text>
          </View>

          <View style={cadastroStyles.formContainer}>
            <Text style={cadastroStyles.sectionTitle}>Preencha os dados abaixo</Text>

            {/* Papel */}
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
                  <Picker.Item label="Selecione o papel" value="" />
                  {papeis.map((papel) => (
                    <Picker.Item key={papel.id} label={papel.nome} value={papel.id.toString()} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Campos de texto */}
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Nome</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o nome"
                value={formData.nome}
                onChangeText={text => handleChange('nome', text)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Email</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o email"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
            </View>

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

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Confirmar Senha</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Confirme a senha"
                secureTextEntry
                value={formData.conf_senha}
                onChangeText={text => handleChange('conf_senha', text)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Documento</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe CPF ou CNPJ"
                value={formData.documento}
                onChangeText={text => handleChange('documento', text)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Telefone</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o telefone"
                value={formData.telefone}
                onChangeText={text => handleChange('telefone', text)}
              />
            </View>

           <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Cidade</Text>

              <View style={{ position: "relative" }}>
                <TextInput
                  style={cadastroStyles.input}
                  placeholder="Digite o nome da cidade"
                  value={termo}
                  onChangeText={(texto) => {
                    setTermo(texto);
                    buscarCidades(texto);
                  }}
                />

                {showList && lista.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 55,
                      left: 0,
                      right: 0,
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 8,
                      maxHeight: 180,
                      zIndex: 10,
                      elevation: 10, // Android sombra
                    }}
                  >
                    <ScrollView nestedScrollEnabled>
                      {lista.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={{ padding: 12 }}
                          onPress={() => {
                            setTermo(`${item.nome} - ${item.uf}`);
                            setFormData(prev => ({
                              ...prev,
                              cidade: item.id,
                              estado: item.codigo_uf
                            }));
                            setShowList(false);
                          }}
                        >
                          <Text>{item.nome} - {item.uf}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>


            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Logradouro</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Rua, Avenida..."
                value={formData.endLogradouro}
                onChangeText={text => handleChange('endLogradouro', text)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Bairro</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o bairro"
                value={formData.endBairro}
                onChangeText={text => handleChange('endBairro', text)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Número</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Informe o número"
                value={formData.endNumero}
                onChangeText={text => handleChange('endNumero', text)}
              />
            </View>

            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Descrição</Text>
              <TextInput
                style={cadastroStyles.input}
                placeholder="Descrição opcional"
                value={formData.descricao}
                onChangeText={text => handleChange('descricao', text)}
              />
            </View>

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
