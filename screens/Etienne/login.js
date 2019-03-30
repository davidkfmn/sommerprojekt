import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { StyleSheet, Text, View, AppRegistry, TextInput, Alert, Button } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.ueberschrift}>Etienne</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },


    ueberschrift: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        padding: 10
    }
});
export default LoginScreen;
