import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../../services/connectionFirebase';
import ListagemCliente from '../Listar/listagemCliente';

const Separator = () => {
    return <View style={styles.separator} />;
}

export default function GerenciarProdutos() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTel] = useState('');
  const [key, setKey] = useState('');
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);


  useEffect(() => {
    async function search() {
      await firebase.database().ref('cliente').on('value', (snapshot) => {

        setClientes([]);

        snapshot.forEach((chilItem) => {

          let data = {
            key: chilItem.key,
            nome: chilItem.val().nome,
            sobrenome: chilItem.val().sobrenome,
            cpf: chilItem.val().cpf,
            endereco: chilItem.val().endereco,
            cep: chilItem.val().cep,
            telefone: chilItem.val().telefone
          };

          setClientes(oldArray => [...oldArray, data].reverse());

        })

        setLoading(false);

      })
    }

    search();

  },
    []);

  async function insertUpdate() {
    
    if (nome !== '' & sobrenome !== '' & cpf !== '' & endereco !== '' & cep !== '' & telefone !== '' & key !== '') {
      firebase.database().ref('cliente').child(key).update({
        nome: nome, sobrenome: sobrenome, cpf: cpf, endereco: endereco, cep: cep, telefone: telefone
      })
      Keyboard.dismiss();
      alert('Cliente editado!');
      clearData();
      setKey('');
      return; 
    }
    
    let clientes = await firebase.database().ref('cliente');
    let chave = clientes.push().key;

    clientes.child(chave).set({
      nome: nome,
      sobrenome: sobrenome,
      cep: cep,
      cpf: cpf,
      telefone: telefone,
      endereco: endereco
    });


    alert('Cliente Cadastrado!');
    clearData();
  }

  function clearData() {
    setNome(''); setSobrenome(''); setCpf(''); setEndereco(''); setCep(''); setTel('');
  }

  function handleDelete(key) {
    firebase.database().ref('cliente').child(key).remove()
      .then(() => {

        const findClientes = clientes.filter(item => item.key !== key)
        setClientes(findClientes)

      })

  }

  function handleEdit(data) {
    setKey(data.key),
      setNome(data.nome),
      setSobrenome(data.sobrenome),
      setCpf(data.cpf),
      setEndereco(data.endereco),
      setCep(data.cep),
      setTel(data.telefone)

  }

  return (

    <View>
        <ImageBackground style={styles.back} source={require('../../../assets/images/back2.jpg')} blurRadius={3}>

        <Text style={styles.titulos}>Cadastro Cliente</Text>

        <TextInput
          placeholder='Nome'
          maxLength={40}
          style={styles.input}
          onChangeText={(texto) => setNome(texto)}
          value={nome} ref={inputRef}
        />

        <TextInput
          placeholder='Sobrenome'
          style={styles.input}
          onChangeText={(texto) => setSobrenome(texto)}
          value={sobrenome} ref={inputRef}
        />

        <TextInput
          placeholder='CPF'
          style={styles.input}
          onChangeText={(texto) => setCpf(texto)}
          value={cpf} ref={inputRef}
        /> 
        

        <TextInput
          placeholder='Telefone'
          style={styles.input}
          onChangeText={(texto) => setTel(texto)}
          value={telefone} ref={inputRef}
        />
        

        <TextInput
          placeholder='Endereço'
          style={styles.input}
          onChangeText={(texto) => setEndereco(texto)}
          value={endereco} ref={inputRef}
        />
        

        <TextInput
          placeholder='CEP'
          style={styles.input}
          onChangeText={(texto) => setCep(texto)}
          value={cep} ref={inputRef}
        />
        

        <TouchableOpacity onPress={() => insertUpdate()}
          style={styles.button}
          activeOpacity={0.5}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Separator/>

      <View>

        <Text style={styles.listar}>Listagem de Clientes</Text>

      </View>

      {loading ?

        (

          <ActivityIndicator color="#fff" size={35} />

        ) :

        (

          <FlatList  keyExtractor={item => item.key} data={clientes} renderItem={({ item }) => (

            <ListagemCliente data={item} deleteItem={handleDelete} editItem={handleEdit}/>
            

          )}

          />

        )

      }
    </View>
  );
}
const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 20,
        color: '#C0C0C0',
        fontWeight: 'bold'
      },
      titulos: {
        textAlign: 'center',
        color: 'white',
        paddingTop: 500,
        fontSize: 30
      },
      input: {
        fontSize: 12,
        color:'#C0C0C0',
        marginTop: 9,
        marginBottom: 7,
        marginLeft: 5,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 9,
        height: 12,
        width: 350,
        padding: 24,
        borderWidth: 1,
        borderColor: '#cb836d',
        flexDirection: 'row'
      },
      back: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        height: 915,
        width: 412
      },
      button: {
        width: 100,
        marginLeft: 225,
        marginTop: 20,
        height: 40,
        margin: 16,
        borderRadius: 10,
        backgroundColor: '#cb836d',
      },
      textoBotao: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    
      },
      listar: {
        marginTop: 500,
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
      }
})