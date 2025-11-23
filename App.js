import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./views/Home";
import Login from "./views/Login";
import Cadastro from "./views/Cadastro";
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
import EmpresaEditar from "./views/EmpresaEditar"
import AdminPanel from "./views/AdminPanel";
import GerenciarCategorias from "./views/GerenciarCategorias";
import GerenciarCargos from "./views/GerenciarCargos";


const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const verificarLoginSalvo = async () => {
      const usuario = await AsyncStorage.getItem("usuarioLogado");
      setInitialRoute(usuario ? "UsuarioComum" : "Home");
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
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
        <Stack.Screen name="FormCadastro" component={FormCadastro} options={{ headerShown: false }}/>
        <Stack.Screen name="FormVagas" component={FormVagas} options={{ headerShown: false }}/>
        <Stack.Screen name="Vagas" component={VagasList} options={{ headerShown: false }}/>
        <Stack.Screen name="UsuarioComum" component={UsuarioComum} options={{ headerShown: false }}/>
        <Stack.Screen name="VagaDetalhes" component={VagaDetalhes} options={{ headerShown: false }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Empresa" component={Empresa} options={{ headerShown: false }}/>
        <Stack.Screen name="VagasAtivas" component={VagasAtivas} options={{ headerShown: false }}/>
        <Stack.Screen name="EditarVaga" component={EditarVaga} options={{ headerShown: false }}/>
        <Stack.Screen name="MinhasCandidaturas" component={MinhasCandidaturas} options={{ headerShown: false }}/>
        <Stack.Screen name="CandidatosVaga" component={CandidatosVaga} options={{ headerShown: false }}/>
        <Stack.Screen name="EmpresaEditar" component={EmpresaEditar} options={{ headerShown: false }}/>
        <Stack.Screen name="AdminPanel" component={AdminPanel} options={{ headerShown: false }}/>
        <Stack.Screen name="GerenciarCategorias" component={GerenciarCategorias} options={{ headerShown: false }} />
        <Stack.Screen name="GerenciarCargos" component={GerenciarCargos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
