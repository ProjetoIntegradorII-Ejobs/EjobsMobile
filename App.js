import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Cadastro, FormCadastro } from './views';
import VagasList from './views/VagasList';
import UsuarioComum from './views/UsuarioComum';
import VagaDetalhes from './views/VagaDetalhes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Página Inicial' }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Acesso', headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ title: 'Cadastro', headerShown: false }}
        />
        <Stack.Screen 
          name="FormCadastro" 
          component={FormCadastro} 
          options={{ title: 'Cadastro', headerShown: false }}
        />
        <Stack.Screen
          name="Vagas" 
          component={VagasList} 
          options={{ title: 'Vagas', headerShown: false }}
        />
        <Stack.Screen
          name="UsuarioComum"
          component={UsuarioComum}
          options={{ title: 'Usuário Comum' }}
        />
       
        <Stack.Screen
          name="VagaDetalhes"
          component={VagaDetalhes}
          options={{ title: 'Detalhes da Vaga' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
