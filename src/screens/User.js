import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import { ImageBackground, SafeAreaView, View, Text, StyleSheet, StatusBar} from 'react-native';
import React, { useEffect, useState } from 'react';
import {onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase'




//TODO -fetch user data and profile pic(would look similar to item fetching in explore.js) 


export default function User({navigation}){
    const[user, setUser] = useState()
    const[name, setName] = useState();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          setName(user.displayName)
        } else {
    
        }
      });

    if (user){
        return (
            <SafeAreaView style = {styles.userbox}>
                <View>
                    <Text style={{fontSize: 30, alignSelf: 'center'} }>{'welcome ' + name}</Text>
                    <Button mode = 'contained' onPress={() => {navigation.navigate('AddItem')}}> Add Item</Button>
                    <Button mode = 'contained' onPress={() => {navigation.navigate('Item', {fileName: "KrBNrD5vCSxZQdDLyo80"})}}>My Items</Button>
                    <Button mode = 'contained' >Saved</Button>
                </View>
            </SafeAreaView>
                
    
        );
    } else {
        return(

            <SafeAreaView>
                <View>
                    <Text> No User :(</Text>
                </View>
            </SafeAreaView>

        )
    }

    
}

const styles = StyleSheet.create({

    userbox: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        justifyContent: 'center',
        marginVertical: '50%',
    },   

});
