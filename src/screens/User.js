import { useNavigation } from '@react-navigation/native';
import React from 'react'
import Button from '../components/Button';
import { ImageBackground, SafeAreaView, View, Text, StyleSheet} from 'react-native';

//TODO -fetch user data and profile pic(would look similar to item fetching in explore.js) 

export default function User({navigation}){
    return (
        <SafeAreaView style = {styles.userbox}>
            <View>
                <Button mode = 'contained' onPress={() => {navigation.navigate('AddItem')}}> Add Item</Button>
                <Button mode = 'contained' onPress={() => {navigation.navigate('Item', {fileName: "KrBNrD5vCSxZQdDLyo80"})}}>My Items</Button>
                <Button mode = 'contained' >Saved</Button>
            </View>
        </SafeAreaView>
            

    );
}

const styles = StyleSheet.create({

    userbox: {
        justifyContent: 'center',
        marginVertical: '50%',
    },   

});
