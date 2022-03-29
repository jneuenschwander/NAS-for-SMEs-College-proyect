import React from 'react';
import { View, Text, Button } from 'react-native';
//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Components
import Login from "./components/Login/login";
import SyncVisor from "./components/syncVisor/syncVisor";   

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
const Stack = createStackNavigator();
export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="syncVisor" component={SyncVisor} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}

