import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { StyleSheet, Text, View, AppRegistry, TextInput, Alert, Button } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Startscreen extends React.Component {

    render() {
        return (

            //<View style={styles.container}>
            <View>
                <Button
                    onPress={() => this.props.navigation.push('NeuerFeed')}
                    title="NeuerFeed"
                    color="#841584"
                />

                <Button
                    onPress={() => this.props.navigation.push('Home')}
                    title="Homescreen"
                    color="#841584"
                />
                <Button
                    onPress={() => this.props.navigation.push('Login')}
                    title="Login"
                    color="#841584"
                />
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
});
export default Startscreen;
