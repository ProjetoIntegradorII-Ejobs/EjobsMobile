import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Index() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>EJobs</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.registerText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner*/}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Encontre seu próximo emprego</Text>
        <Text style={styles.bannerSubtitle}>Milhares de vagas disponíveis para você</Text>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o título da vaga"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categorias Populares */}
      <Text style={styles.sectionTitle}>Categorias Populares</Text>
      <View style={styles.categoriesRow}>
        <View style={styles.categoryCard}>
          <MaterialIcons name="campaign" size={40} color="#007aff" />
          <Text style={styles.categoryTitle}>Marketing</Text>
          <Text style={styles.categoryCount}>0 vagas disponíveis</Text>
        </View>
        <View style={styles.categoryCard}>
          <Ionicons name="laptop-outline" size={40} color="#007aff" />
          <Text style={styles.categoryTitle}>Tecnologia</Text>
          <Text style={styles.categoryCount}>5 vagas disponíveis</Text>
        </View>
        <View style={styles.categoryCard}>
          <FontAwesome5 name="chart-line" size={40} color="#007aff" />
          <Text style={styles.categoryTitle}>Vendas</Text>
          <Text style={styles.categoryCount}>0 vagas disponíveis</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007aff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  logo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#fff',
    opacity: 0.8,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#007aff',
    borderRadius: 12,
    margin: 20,
    padding: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  searchBtn: {
    backgroundColor: '#34c759',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#222',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  categoryCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    padding: 18,
    width: 110,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007aff',
    marginTop: 8,
  },
  categoryCount: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});
