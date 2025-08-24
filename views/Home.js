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
          onPress={() => navigation.navigate('Login', { id: 30 })}
        >
          <Text style={homeStyles.buttonText}> Login</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}