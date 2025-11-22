import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logout(navigation) {
  try {
    await AsyncStorage.removeItem("usuarioLogado");

    // opcional: limpar todo storage
    // await AsyncStorage.clear();

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }], 
    });

  } catch (error) {
    console.error("Erro ao sair:", error);
  }
}
