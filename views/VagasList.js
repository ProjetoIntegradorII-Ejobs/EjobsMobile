import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import VagasController from '../controllers/VagasController';

export default function VagasList({ navigation }) {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const data = await VagasController.getVagas();
        setVagas(data);
      } catch (err) {
        console.error('Erro ao carregar vagas:', err);
      } finally {
        setLoading(false);
      }
    }
    carregarVagas();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("VagaDetalhes", { id: item.id })}
          >
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text numberOfLines={2}>{item.descricao}</Text>
            <Text style={styles.salario}>Salário: R$ {item.salario}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  salario: {
    marginTop: 5,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
