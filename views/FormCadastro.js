import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginController from '../controllers/LoginController';


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

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [papeis, setPapeis] = useState([]);

const handleChange = async (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));

  if (field === 'estado') {
    setFormData(prev => ({ ...prev, estado: value, cidade: '' }));

    try {
      const cidadesEstado = await CadastroController.carregaCidades(value);
      console.log("Cidades recebidas:", cidadesEstado);
      setCidades(Array.isArray(cidadesEstado) ? cidadesEstado : []);
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
      setCidades([]);
      Alert.alert('Erro', 'Falha ao carregar cidades do estado selecionado');
    }
  }
};



  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await CadastroController.create();
        if (data.success) {
          setEstados(data.estados || []);
          setPapeis(data.papeis || []);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar dados do cadastro');
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível conectar ao servidor');
      }
    };
    loadData();
  }, []);

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
        
        const loginResult = await LoginController.login(
        formData.email,
        formData.senha
        );

      if (loginResult.success && loginResult.usuario) {
          await AsyncStorage.setItem("usuarioLogado", JSON.stringify(loginResult.usuario));
          console.log("Usuário logado automaticamente:", loginResult.usuario);

          const tipo = loginResult.usuario.tipo;

          if (tipo === 1) {
            navigation.replace("UsuarioComum");
          } else if (tipo === 3) {
            navigation.replace("Empresa");
          } else {
            navigation.replace("Home");
          }
      } else {
                Alert.alert('Erro', 'Não foi possível realizar login automático.');
                navigation.replace('Login');
      }

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
          <View style={cadastroStyles.header}>
            <Text style={cadastroStyles.title}>Cadastro de Usuário</Text>
          </View>

          <View style={cadastroStyles.formContainer}>
            <Text style={cadastroStyles.sectionTitle}>Preencha os dados abaixo</Text>
            
    
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

        
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Estado</Text>
              <View style={cadastroStyles.pickerContainer}>
               <Picker
  selectedValue={formData.estado}
  onValueChange={(value) => handleChange('estado', value)}
  style={cadastroStyles.picker}
>
  <Picker.Item label="Selecione o estado" value="" />
  {estados.map((estado) => (
    <Picker.Item key={estado.codigo_uf} label={estado.nome} value={estado.codigo_uf.toString()} />
  ))}
</Picker>

              </View>
            </View>

           
            <View style={cadastroStyles.inputGroup}>
              <Text style={cadastroStyles.label}>Cidade</Text>
              <View style={cadastroStyles.pickerContainer}>
                <Picker
                  selectedValue={formData.cidade}
                  onValueChange={(value) => handleChange('cidade', value)}
                  style={cadastroStyles.picker}
                  enabled={cidades.length > 0}
                >
                  <Picker.Item label="Selecione a cidade" value="" />
                  {cidades.map((cidade) => (
                    <Picker.Item key={cidade.id} label={cidade.nome} value={cidade.id.toString()} />
                  ))}
                </Picker>
              </View>
            </View>

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

            {/* Descrição */}
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
