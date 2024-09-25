/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useContext} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View, Image, Text,Alert} from 'react-native';


function Login({navigation}) {
  const [credentials,setCredentials] = React.useState({
    username:"",
    password:""
  })

  
   const User =()=>{
      if(credentials.username && credentials.password){
        navigation.navigate('Details');
      }
   }

   
  return (
    <SafeAreaView>
      <View style={stylesheet.container}>
        <View style={stylesheet.LoginContainer}>
          <TextInput
            mode="outlined"
            label="College Email"
            right={<TextInput.Affix text="/100" />}
            style={stylesheet.textInput}
            onChangeText={(text) => setCredentials({...credentials,username:text})}
          />
          <TextInput
            mode="outlined"
            label="Password"
            right={<TextInput.Affix text="/100" />}
            onChangeText={(text)=>setCredentials({...credentials,password:text})}
          />

          <View style={stylesheet.buttoncont}>
            <Button
              contentStyle={{height: 50}}
              onPress={User}
              mode="contained"
              buttonColor="black"
              textColor="white">
              Login
            </Button>
           
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ImageContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  LoginContainer: {
    width: '90%',
    flex:1,
    margin: 10,
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    color: 'black',
  },
  buttoncont: {
    height: '200px',
    width: '200px',
    marginTop: 10,
    gap: 10,
  },
});

export default Login;
