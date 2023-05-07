import React, {useState} from 'react';
import { StyleSheet, Text, Image, TextInput, View, TouchableOpacity, Button} from 'react-native';
import firebase from '../../services/connectionFirebase';

export default function Login({changeStatus}){
  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 function handleLogin(){
    if(type === 'login'){
      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid)
      })
      .catch((err)=>{
        console.log(err);
        alert('Email ou senha não cadastrados!');
        return;
      })

    }else{
     // Aqui cadastramos o usuario 
     const user = firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((user)=>{
       changeStatus(user.user.uid)
     })
     .catch((err)=>{
      console.log(err);
      alert('Erro ao Cadastrar!');
      return;
     })
    }
  }
return(

  <View style = {styles.container}>
    <View>
      <Image source={require('../../../assets/images/logobranca.png')} style={{width:363, height: 350, margin: 'auto'}}/>
    </View>
        
        <TextInput placeholder="Digite o e-mail" label="E-mail: " value={email} onChangeText={ (text) => setEmail(text)} style = {styles.text1}/>

        <TextInput placeholder="Digite a senha" label="Senha: " secureTextEntry  value={password} onChangeText={ (text) => setPassword(text)} style = {styles.text1}/>

      <TouchableOpacity  style={[styles.handleLogin, { backgroundColor: type === 'login' ? '#f5dbd3' : '#f5dbd3' } ]} onPress={handleLogin} >
      <Text style={{ textAlign: 'center'}}>{ type === 'login' ? 'Acessar' : 'Cadastrar' }</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
      <Text style={{ textAlign: 'center'}}>
        {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta' }
      </Text>
    </TouchableOpacity>

</View>
  );
  }


const styles = StyleSheet.create({
    container:{
      backgroundColor: '#cb836d',
      flex: 1,
      justifyContent: "center",
      padding: 10,
    },
    text1:{
      backgroundColor: '#FFFFFF',
      padding: 5, 
      borderRadius: 10, 
      height: 40, 
      margin: 16, 
      borderColor: 'black',
    },
    handleLogin:{
      padding: 10, 
      borderRadius: 10, 
      height: 40, 
      margin: 16,
      textAlign: "center"
    }
});

