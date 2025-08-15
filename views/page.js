import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {css} from '../assets/css/Css'


export default function Page(props)
{
    return (
     <View style={css.textPage}>
         <Text>O Nome da empresa é {props.empresa} </Text>
     </View>
    );
}