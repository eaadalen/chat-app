import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const image = require('.././assets/Background-Image.png');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
        <Text style={styles.title}>Chat App</Text>
        <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
        />
        <Text style={styles.chooseBackgroundColorText}>Choose Background Color:</Text>
        <View style={styles.colorOptions}>
            <TouchableOpacity style={styles.colorButton1} onPress={() => setColor("#090C08")}></TouchableOpacity>
            <TouchableOpacity style={styles.colorButton2} onPress={() => setColor("#474056")}></TouchableOpacity>
            <TouchableOpacity style={styles.colorButton3} onPress={() => setColor("#8A95A5")}></TouchableOpacity>
            <TouchableOpacity style={styles.colorButton4} onPress={() => setColor("#B9C6AE")}></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat', {name: name, color: color})}>
            <Text style={styles.text}>Start Chatting</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    //fontWeight: 600,
    color: "#FFFFFF",
  },
  text: {
    fontSize: 16,
    //fontWeight: 600,
    color: "#FFFFFF",
  },
  textInput: {
    fontSize: 16,
    //fontWeight: 300,
    color: "#757083",
    opacity: 1,
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF"
  },
  chooseBackgroundColorText: {
    fontSize: 16,
    //fontWeight: 300,
    color: "#fff",
    opacity: 1,
  },
  colorOptions: {
    flexDirection: "row",
    padding: 15
  },
  colorButton1: {
    borderWidth:1,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    marginRight: 15,
    backgroundColor:'#090C08',
    borderRadius:50,
  },
  colorButton2: {
    borderWidth:1,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    marginRight: 15,
    backgroundColor:'#474056',
    borderRadius:50,
  },
  colorButton3: {
    borderWidth:1,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    marginRight: 15,
    backgroundColor:'#8A95A5',
    borderRadius:50,
  },
  colorButton4: {
    borderWidth:1,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    backgroundColor:'#B9C6AE',
    borderRadius:50,
  },
  chatButton: {
    fontSize: 16,
    //fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#757083",
    opacity: 1,
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center'
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Start;