import React,{useState, useEffect} from "react";
import { StyleSheet, Text, View,  Image, TextInput, TouchableOpacity,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image from "../../assets/logo192.png";
import {selectDirectory} from 'react-native-immersive-bars';
import DocumentPicker from 'react-native-document-picker';
import RNFileSelector from 'react-native-file-selector';
export default function syncVisor(){
    let test =  () =>{
       
          
    }
    return(
        <View>
            <Image source={image}/>
            <Text>{"Loading"}</Text>
            <Button title="prueba"onPress={test}/>
            <RNFileSelector title={"Select File"} visible={true} onDone={() => {
                console.log("file selected: " + path);
            }} onCancel={() => {
                console.log("cancelled");
            }}/>
        </View>
    );
}