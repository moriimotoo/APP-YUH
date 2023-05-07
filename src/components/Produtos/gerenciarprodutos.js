import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../../services/connectionFirebase';
import Listagem from '../Listar/listagem';


const Separator = () => {
  return <View style={styles.separator} />;
}

export default function GerenciarProdutos() {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [key, setKey] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);


  useEffect(() => {

    async function search() {

      await firebase.database().ref('produto').on('value', (snapshot) => {

        setProdutos([]);

        snapshot.forEach((chilItem) => {

          let data = {
            key: chilItem.key,
            nome: chilItem.val().nome,
            marca: chilItem.val().marca,
            valor: chilItem.val().valor,
            categoria: chilItem.val().categoria,

          };

          setProdutos(oldArray => [...oldArray, data].reverse());

        })

        setLoading(false);

      })

    }

    search();

  },
    []);

  async function insertUpdate() {
    //editar dados
    if (nome !== '' & marca !== '' & valor !== '' & categoria !== '' & key !== '') {
      firebase.database().ref('produto').child(key).update({
        nome: nome, marca: marca, valor: valor, categoria: categoria
      })
      Keyboard.dismiss();
      alert('Produto Editado!');
      clearData();
      setKey('');
      return; ''
    }
    //cadastrar dados
    let produtos = await firebase.database().ref('produto');
    let chave = produtos.push().key;



    produtos.child(chave).set({
      nome: nome,
      marca: marca,
      valor: valor,
      categoria: categoria
    });


    alert('Produto Cadastrado!');
    clearData();
  }

  function clearData() {
    setNome(''); setCategoria(''); setMarca(''); setValor('');
  }

  //função para excluir um item  
  function handleDelete(key) {
    firebase.database().ref('produto').child(key).remove()
      .then(() => {

        //todos os itens que forem diferentes daquele que foi deletado
        //serão atribuidos no array
        const findProdutos = produtos.filter(item => item.key !== key)
        setProdutos(findProdutos)

      })

  }

  //função para editar  

  function handleEdit(data) {
    setKey(data.key),
      setNome(data.nome),
      setMarca(data.marca),
      setValor(data.valor),
      setCategoria(data.categoria)

  }


  return (
    <View style={styles.container}>
      <ImageBackground style={styles.back} source={require('../../../assets/images/back.jpeg')} blurRadius={6}>
        
        <Text style={styles.titulos}>Cadastrar Produtos</Text>
        <TextInput
          placeholder='Produto'
          maxLength={40}
          style={styles.input}
          onChangeText={(texto) => setNome(texto)}
          value={nome} ref={inputRef}
        />
        <Separator />
        <TextInput
          placeholder='Marca'
          style={styles.input}
          onChangeText={(texto) => setMarca(texto)}
          value={marca} ref={inputRef}
        />
        <Separator />
        <TextInput
          placeholder='Preço'
          style={styles.input}
          onChangeText={(texto) => setValor(texto)}
          value={valor} ref={inputRef}
        /> 
        <Separator />

        {
          //<Ionicons name="category" size={30} />
        }
        <TextInput
          placeholder='Categoria'
          style={styles.input}
          onChangeText={(texto) => setCategoria(texto)}
          value={categoria} ref={inputRef}
        />
        <Separator />
        <TouchableOpacity onPress={() => insertUpdate()}
          style={styles.button}
          activeOpacity={0.5}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View>

        <Text style={styles.listar}>Listagem de Produtos</Text>

      </View>

      {loading ?

        (

          <ActivityIndicator color="#fff" size={35} />

        ) :

        (

          <FlatList  keyExtractor={item => item.key} data={produtos} renderItem={({ item }) => (

            <Listagem data={item} deleteItem={handleDelete} editItem={handleEdit}/>
            

          )}

          />

        )

      }
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
    color: '#C0C0C0',
    fontWeight: 'bold'
  },
  titulos: {
    textAlign: 'center',
    color: 'white',
    paddingTop: 400,
    fontSize: 30
  },
  input: {
    fontSize: 12,
    color:'#C0C0C0',
    marginTop: 15,
    marginBottom: 3,
    marginRight: 13,
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
    marginTop: 13

  },
  listar: {
    marginTop: 380,
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
})