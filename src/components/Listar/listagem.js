import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Listagem({ data, deleteItem, editItem }) {

    return (

        <View style={styles.container}>

            <Text style={styles.text}>Produto: {data.nome}</Text>
            <Text style={styles.text}>Marca: {data.marca}</Text>
            <Text style={styles.text}>Preço(R$): {data.valor}</Text>
            <Text style={styles.text}>Categoria: {data.categoria}</Text>



            <View style={styles.item}>

            <TouchableOpacity onPress={()=> deleteItem(data.key)}> 
                <Icon name="trash" color="#A52A2A" size={15}>Excluir</Icon> 
            </TouchableOpacity> 

            <TouchableOpacity onPress={() => editItem(data)}> 
                <Icon name="create" color="blue" size={15}>Editar</Icon> 
            </TouchableOpacity> 

            </View>

        </View>

    )

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        margin: 30,
        backgroundColor: 'white',

    },

    text: {
        color: 'black',
        fontSize: 13

    },

    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'

    }

}); 