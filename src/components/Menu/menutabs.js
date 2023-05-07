import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import GerenciarProdutos from '../Produtos/gerenciarprodutos';
import Home from '../Home/home';
import CadastroCliente from '../CadastroCliente/cadastroCliente';


function HomeScreen() {
    return <Home/>

}

function ListScreen() {
    return <CadastroCliente/>
}

function PostScreen() {
    return <GerenciarProdutos/>
}

function LerScreen() {
    return (
        <View style={styles.container}>
            <Text></Text>
        </View>
    );
}

function NotificationsScreen() {
    return (
        <View style={styles.container}>
            <Text></Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = 'home';
                                break;
                            case 'Cadastro Cliente':
                                iconName = 'list';
                                break;
                            case 'Cadastro Produto':
                                iconName = 'save';
                                break;
                            case 'Ler API':
                                iconName = 'open-book';
                                break;
                            default:
                                iconName = 'bell';
                                break;
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#cb836d',
                    inactiveTintColor: '#777',
                    showLabel: true,
                }}>
                    
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Cadastro Cliente" component={ListScreen} />
                <Tab.Screen name="Cadastro Produtdo" component={PostScreen}/>
                <Tab.Screen name="Ler API" component={LerScreen}/>
                <Tab.Screen name="Notificações" component={NotificationsScreen} />
                </Tab.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTabRound: {
        width: 60,
        height: 90,
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#9C27B0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
});