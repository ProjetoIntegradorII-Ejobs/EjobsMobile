import React, { useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Alert} from "react-native";
import {css} from './assets/css/Css';
import Page from './views/page';

export default function App() {
    const [product,setProduct]=useState('teste');
    const [quantity,setQuantity]=useState(0);

    useEffect(()=>{
       if(quantity > 0){
           Alert.alert('Candidatura Feita com Sucesso');
       }
    },[quantity]);

    const props={
        empresa:'Ejobs',
        produto: product,
        quantidade: quantity
    };

  return (
    <View style={css.container}>
        <Text>{product}</Text>
        <Page {...props} />
        <Button title='Candidatar-se' onPress={()=>setQuantity(quantity + 1)} />
    </View>
  );
}