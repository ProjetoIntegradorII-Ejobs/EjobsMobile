import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { homeStyles } from '../assets/css/HomeStyles';

export default function Home({ navigation }) {
  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Bem-vindo ao EJobs Mobile</Text>
      <Text style={homeStyles.subtitle}>
        Sua plataforma de vagas e oportunidades profissionais
      </Text>
      
      <View style={homeStyles.buttonContainer}>
        <TouchableOpacity 
          style={homeStyles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={homeStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={homeStyles.button}
          onPress={() => navigation.navigate('Vagas')}
>
          <Text style={homeStyles.buttonText}>Ver Vagas</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}