import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />;
}

class TelaPrincipal extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
  return (
    <View>
      <Image source={require('../../../assets/images/logo.png')} style={{ width:260, height: 300, margin: 70, marginTop: 150}}/>

      <View>
        <Button onPress={() =>this.props.navigation.navigate('Login')}  title="Acessar"/>
        <Separator/>
        <Button onPress={""}  title="Ajuda" style={styles.button}/>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  separator: {
    marginVertical: 10,
  },
  button:{
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 30
  },
});

export default TelaPrincipal;
