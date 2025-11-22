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

console.log("LOGIN COMPONENT =>", Login);

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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="FormCadastro" component={FormCadastro} />
        <Stack.Screen name="FormVagas" component={FormVagas} />
        <Stack.Screen name="Vagas" component={VagasList} />
        <Stack.Screen name="UsuarioComum" component={UsuarioComum} />
        <Stack.Screen name="VagaDetalhes" component={VagaDetalhes} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
        <Stack.Screen name="Empresa" component={Empresa} />
        <Stack.Screen name="VagasAtivas" component={VagasAtivas} />
        <Stack.Screen name="EditarVaga" component={EditarVaga} />
        <Stack.Screen name="MinhasCandidaturas" component={MinhasCandidaturas} />
        <Stack.Screen name="CandidatosVaga" component={CandidatosVaga} />
        <Stack.Screen name="EmpresaEditar" component={EmpresaEditar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
