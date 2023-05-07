import { useState } from "react";
import { View , Animated, Image, StyleSheet, ImageBackground } from "react-native";

export default function HomeScreen(){
    const [largura, setLargura] = useState(new Animated.Value(0));
    const [altura, setAltura] = useState(new Animated.Value(30));
    Animated.sequence([
        Animated.timing(
        largura,
        {
            toValue: 400,
            duration: 2000
        }
        ),
        Animated.timing(
            altura,
            {
                toValue: 300,
                duration: 1000
            }
        )
    ]).start();

    return(
        <View style={[styles.container]}>
            <ImageBackground style={styles.back} source={require('../../../assets/images/Fashionista.jpeg')} blurRadius={6}/>
            <Animated.Image source={require('../../../assets/images/logobranca.png')} style={{width: largura, height: altura, marginBottom: 210}}/>
        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fff',
        
      },
      back: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        height: 915,
        width: 412
      }

});