import React, { useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Alert} from "react-native";
import {css} from './assets/css/Css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import Login from './views/Login';

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
          options={{ title: 'Acesso' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}