import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View,  Image, TextInput, TouchableOpacity  } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import image from "../../assets/logo192.png";
import {Auth} from '../../requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({ navigation }){
    
    const [auth, setAuth] = useState({userName:'', userPassword:''});
    //console.log(auth)
    let autentificar = async () => {
        if(auth.userName != '' && auth.userPassword != ''){
            Auth.Login(auth.userName, auth.userPassword)
            .then(async (res) => {
                //console.log(res);
                const token = res.data.access_token;
                await AsyncStorage.setItem('user',token);
                
                navigation.navigate('syncVisor', {})
            })
            .catch((err) => {
                console.log(err)
                // setAlerta([{
                //     title: 'Warning',
                //     description: 'Credenciales invalidas',
                //     backgroundColor:'#f39c12',
                //     icon:TriangleAlert
                // }]);
            });
            
        }
    }

    return (
        <View style={style.container}>
            <View style={style.container}>
                <Image
                    style={{marginBottom:20}}
                    source={image}
                />
                <View style={style.borderStyle}>
                    <TextInput  
                    onChangeText={(value) =>setAuth({
                        userName:value
                    })}
                    placeholder=" Digite su nombre de usuario "/>
                </View>
                <View style={style.borderStyle}>
                    <TextInput 
                        onChangeText={(value)=>setAuth({
                            userName:auth['userName'],
                            userPassword: value 
                        })} 
                        //secureTextEntry={true}
                        placeholder=" Digite su contraseña "/>
                </View>
                <View style={style.buttonStyle}>
                    <TouchableOpacity onPress={ autentificar} style={style.buttonStyle}>
                        <Text style={style.buttonText}> Iniciar sesión </Text>
                    </TouchableOpacity>
                </View>
            </View>    
        </View>
    );
    
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B2F3FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    borderStyle:{
        margin:10,
        padding:7,
        borderColor:'black',
        backgroundColor:'#BCE2E9',
        width:300,
        borderWidth: 0,
        borderStyle: 'solid',
        fontSize:15,
        borderRadius: 25,
    },
    buttonStyle:{
        
        backgroundColor: "#18DCFF",
        padding: 6,
        borderRadius: 25,
        
    },
    buttonText: {
        color: "white"
    }
});  

