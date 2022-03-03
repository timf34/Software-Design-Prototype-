import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ImageBackground, SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';


export default function User({navigation}){
    return (
        <SafeAreaView style = {styles.userbox}>
            <View>
                <Button title = 'add item' onPress={() => {navigation.navigate('AddItem')}}/>
                <Button title = 'owned' onPress={() => {navigation.navigate('Item', {fileName: "KrBNrD5vCSxZQdDLyo80"})}}/>
                <Button title = 'saved'/>
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
