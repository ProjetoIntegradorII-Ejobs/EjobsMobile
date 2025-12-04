import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./views/Home";
import Login from "./views/Login";
import FormCadastro from "./views/FormCadastro";
import FormVagas from "./views/FormVagas";
import VagasList from "./views/VagasList";
import UsuarioComum from "./views/UsuarioComum";
import VagaDetalhes from "./views/VagaDetalhes";
import { ActivityIndicator, View } from "react-native";
import Perfil from "./views/Perfil";
import Empresa from "./views/Empresa";
import VagasAtivas from "./views/VagasAtivas";
import EditarVaga from "./views/EditarVaga";
import MinhasCandidaturas from "./views/MinhasCandidaturas";
import CandidatosVaga from "./views/CandidatosVaga";
import EmpresaEditar from "./views/EmpresaEditar";
import AdminPanel from "./views/AdminPanel";
import GerenciarCategorias from "./views/GerenciarCategorias";
import GerenciarCargos from "./views/GerenciarCargos";
import AdminCadastrarCargos from "./views/AdminCadastrarCargos";
import AdminEditarCargo from "./views/AdminEditarCargo";
import AdminCadastrarCategoria from "./views/AdminCadastrarCategorias";
import AdminEditarCategoria from "./views/AdminEditarCategorias";
import ListNotificacao from "./views/ListNotificacao";
import NotificacaoDetalhes from "./views/NotificacaoDetalhes";
import GerenciarUsuarios from "./views/GerenciarUsuarios";
import EmpresasPendentes from "./views/EmpresasPendentes";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
  const verificarLoginSalvo = async () => {
    const dados = await AsyncStorage.getItem("usuarioLogado");

    if (!dados) {
      setInitialRoute("Home");
      return;
    }

    const usuario = JSON.parse(dados);

    if (usuario.tipo === 3) {
      setInitialRoute("Empresa");
    } else if (usuario.tipo === 2) {
      setInitialRoute("AdminPanel");
    } else if (usuario.tipo==1) {
      setInitialRoute("UsuarioComum");
    }
  };

  verificarLoginSalvo();
}, []);


  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormCadastro"
          component={FormCadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormVagas"
          component={FormVagas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vagas"
          component={VagasList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UsuarioComum"
          component={UsuarioComum}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VagaDetalhes"
          component={VagaDetalhes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Empresa"
          component={Empresa}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VagasAtivas"
          component={VagasAtivas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarVaga"
          component={EditarVaga}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MinhasCandidaturas"
          component={MinhasCandidaturas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CandidatosVaga"
          component={CandidatosVaga}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmpresaEditar"
          component={EmpresaEditar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GerenciarCategorias"
          component={GerenciarCategorias}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="GerenciarCargos" component={GerenciarCargos} />
        <Stack.Screen
          name="AdminCadastrarCargos"
          component={AdminCadastrarCargos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminEditarCargo"
          component={AdminEditarCargo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminCadastrarCategoria"
          component={AdminCadastrarCategoria}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminEditarCategoria"
          component={AdminEditarCategoria}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ListNotificacao" 
          component={ListNotificacao} 
           options={{ headerShown: false }}
           />
        <Stack.Screen
          name="NotificacaoDetalhes"
          component={NotificacaoDetalhes}
           options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GerenciarUsuarios" 
          component={GerenciarUsuarios} 
           options={{ headerShown: false }}/>
        <Stack.Screen
          name="EmpresasPendentes"
          component={EmpresasPendentes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
