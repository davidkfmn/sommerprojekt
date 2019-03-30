import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { StyleSheet, Text, View, AppRegistry, TextInput, Alert, Button } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { black } from 'ansi-colors';
import { ImagePicker } from 'expo';
//import * as ImagePicker from 'expo-image-picker';

class Homescreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholerID: 'ID',
      placeholderPicture: 'Upload pic',
      ID: '',
      pic: '',
    }
  }

  handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    
    if (result.cancelled) {
      console.log('got here');
      return;
    }
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: "MyPic",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      },
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="neuerFeed"
        />
      ),
      headerLeft: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Logout"
        />
      ),
    };
  };

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1.5, backgroundColor: '#F5F5F5' }}>
          <Text>Bellow you can see your pictures, 'Username'!</Text>


          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: 70, height: 70 }}>
              <TextInput
                placeholder={this.state.placeholerID}
                style={styles.textinput}
                onChangeText={ID => this.setState({ ID })}
                value={this.state.ID}
              />
            </View>
            <View style={{ width: 70, height: 70 }}>
              <TextInput
                placeholder={this.state.placeholderPicture}
                style={styles.textinput}
                onChangeText={pic => this.setState({ pic })}
                value={this.state.pic}
              />
            </View>
            <View style={{ width: 70, height: 70 }}>
              <Button
                style={{ flex: 1, width: 50, height: 50 }}
                onPress={() => alert('This is a button!')}
                title="Upload"
              />
            </View>

          </View>
        </View>

        <View style={{ flex: 8 }} />
        <Button
          style={{ flex: 1, }}
          onPress={this.handleChoosePhoto}
          title="Upload a picture"
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


  ueberschrift: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    padding: 10
  },
  textinput: {
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 3,
    margin: 5,
    padding: 10

  },
});
export default Homescreen;
