import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import VagasController from '../controllers/VagasController';

export default function VagaDetalhes({ route }) {
  const { id } = route.params;
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarVaga() {
      try {
        const data = await VagasController.getVagaById(id);
        setVaga(data);
      } catch (err) {
        console.error('Erro ao carregar detalhes da vaga:', err);
      } finally {
        setLoading(false);
      }
    }
    carregarVaga();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!vaga) {
    return (
      <View style={styles.center}>
        <Text>Vaga não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{vaga.titulo}</Text>
      <Text style={styles.empresa}>{vaga.empresa} - {vaga.cargo}</Text>
      <Text style={styles.info}>Categoria: {vaga.categoria}</Text>
      <Text style={styles.info}>Modalidade: {vaga.modalidade}</Text>
      <Text style={styles.info}>Horário: {vaga.horario}</Text>
      <Text style={styles.info}>Regime: {vaga.regime}</Text>
      <Text style={styles.info}>Salário: R$ {vaga.salario}</Text>

      <Text style={styles.subtitulo}>Descrição</Text>
      <Text style={styles.texto}>{vaga.descricao}</Text>

      <Text style={styles.subtitulo}>Requisitos</Text>
      <Text style={styles.texto}>{vaga.requisitos}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  empresa: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  subtitulo: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
  },
});
