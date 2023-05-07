import Constants from 'expo-constants';
import { Text, StyleSheet } from "react-native";
import { View } from "react-native";



export default function HomeScreen(){
    return(
        <View style={[styles.container]}>
            <Text>Olá Seja Bem vindo!</Text>
        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
        
      },

});