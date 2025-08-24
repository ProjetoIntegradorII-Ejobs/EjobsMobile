import { StyleSheet } from "react-native";

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPage:{
    backgroundColor: 'orange', 
    padding: 20
  },
  bg: { 
    backgroundColor: '#white'
  },
  login__msg:{
    fontWeight:'bold',
    fontSize:22,
    color:'red',
    marginTop: 10,
    marginBottom: 15
  }, 
  login__form:{ 
    width: '80%'
  },
  login__input:{
    backgroundColor: '#fff',
    fontSize: 19,
    padding: 7,
    marginBottom: 15
  },
  login__button:{
    padding: 12,
    backgroundColor: '#49BA49',
    alignSelf: 'center',
    borderRadius: 5
  },
  login__buttonText:{
    fontWeight:"bold",
    fontSize: 22,
    color:"#333"  
  }

});

export {css}; 