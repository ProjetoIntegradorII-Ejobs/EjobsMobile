import React from 'react';
import { Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity} from 'react-native';
import {css} from '../assets/css/Css';

// A Mensagem será usada dinamicamente no futuro, eu espero 

export default function Login({route})
{
    return(
      <KeyboardAvoidingView 
        style={[css.container, css.bg]}>
        
        
        <View>
          <Text style={css.login__msg }> Usuário ou senha Inválido</Text>
        </View>

        <View style={css.login__form}>  
            
            <TextInput style={css.login__input} placeholder='Informe seu Email' />
            <TextInput style={css.login__input} placeholder='Informe sua senha' secureTextEntry={true} />
            <TouchableOpacity style={css.login__button}>
              <Text style={css.login__buttonText}>Entrar </Text>
            </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
}