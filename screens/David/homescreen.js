import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { StyleSheet, Text, View, ScrollView, AppRegistry, TextInput, Alert, Button, Image, FlatList, ActivityIndicator, Switch } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { black } from 'ansi-colors';
import { ImagePicker } from 'expo';
import { ImageManipulator } from 'expo';

//import * as ImagePicker from 'expo-image-picker';

class Homescreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      placeholerID: 'ID',
      placeholderPicture: 'Upload pic',
      pic: '',
      photo: null,
      picurl: 'url',
      userid: '0',
      statplace: 'status',
      stat: '',
      bilder: [],
      deleteid: '',
      statuspic: '1'

    }
  }

  state = {switchValue:false}
  //state = {statuspic: "0"}
  toggleSwitch = (value) => {
      //onValueChange of the switch this function will be called
      if(this.state.statuspic == '1'){
        this.setState({statuspic: '0'})
      } else {
        this.setState({statuspic: '1'})
      }

      this.setState({switchValue: value});
      //state changes according to switch
      //which will result in re-render the text
   }

  imgSingle(base, id) {
    const theimg = 'data:image/png;base64,'+base;
    const theid = id;
   // console.log(theid);
    return(
      <View>
      <Image
        style={{width: 300, height: 300}}
        source={{uri: `${theimg}`}}
      />
      <Button
        title="delete this picture"
        //onPress={this.deletepicture(theid)}
        onPress={() => { this.deletepicture(theid) }}
      />
      </View>
    )
  }

  deletepicture = async (theid) => {
    //Alert.alert(theid);

      fetch('https://itlabor0.htldornbirn.vol.at/projekt1/pic?id=' +theid, {
        method: 'DELETE',
      }).then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(JSON.stringify(responseJson))
          this.loadfromserver(this.state.userid);
        })
        .catch((error) => {
          console.error(error);
        });
  }


  imgList(myList) {
   console.log("im imgList" + myList);
   if (!myList && myList.length == 0) {
     return (<View></View>);
   }
    return myList.map((pic, index)=>{
        return (
          <View key={index}>
            <Text>{index}</Text>
            {this.imgSingle(pic.picture, pic.userID)}
          </View>
        )
    })
  }


  uploadonserver = async (url, userid, stat) => {
    if (url !== 'url' && userid !== 0 && stat !== 'status') {

      const manipResult1 = await ImageManipulator.manipulateAsync(
        url,
        [{ rotate: 360 }],
        { base64: true }
      );

      fetch('https://itlabor0.htldornbirn.vol.at/projekt1/pic', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid,
          manipResult: manipResult1.base64,
          status: stat,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(JSON.stringify(responseJson));
          this.loadfromserver(this.state.userid);
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      Alert.alert('Please select a picture first!');
    }
  }

  loadfromserver = async (userid) => {
    fetch('https://itlabor0.htldornbirn.vol.at/projekt1/pic?userid=' + userid)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ bilder: responseJson.result,
        deleteid: responseJson.id });
      })
      .catch((error) => {
        console.error(error);
      });
    
  }


  picPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (result.uri) {
      this.setState({ photo: result });
      this.setState({ picurl: result.uri })
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
    const { photo } = this.state;
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 2 }}>
         
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: 70, height: 70 }}>
              <TextInput
                placeholder={this.state.userid}
                style={styles.textinput}
                onChangeText={userid => this.setState({ userid })}
                value={this.state.userid}
              />
            </View>
            <View style={styles.container}>
              {/*Text to show the text according to switch condition*/}
              <Text>{this.state.switchValue ? 'Pic is public' : 'Pic is private'}</Text>
              {/*Switch with value set in constructor*/}
              {/*onValueChange will be triggered after switch condition changes*/}
              <Switch
                style={{ marginTop: 30 }}
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue} />
            </View>
        
            <View style={{ width: 70, height: 70 }}>
              <Button
                style={{ flex: 1, width: 50, height: 50 }}
                onPress={() => { this.uploadonserver(this.state.picurl, this.state.userid, this.state.statuspic) }}
                title="Upload"
              />
            </View>
            <View style={{ width: 70, height: 70 }}>
              <Button
                style={{ flex: 1, width: 50, height: 50 }}
                onPress={() => { this.loadfromserver(this.state.userid) }}
                title="Load Pics"
              />
            </View>


          </View>
        </View>

        <View style= {{flex:10}}>
          <ScrollView>
                {
                          <View>
                          {this.imgList(this.state.bilder)}
                        </View>            
                }
          </ScrollView>
                <Button
                  style={{ flex: 1, }}
                  onPress={this.picPhoto}
                  title="Select a picture"
                />
        </View>
        
        
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

  bilder: {
    flex: 1,
    // borderWidth: 10,
  }
});
export default Homescreen;
