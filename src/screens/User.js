import React from 'react'
import { ImageBackground, SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';

const User = () => {
    return (
        <SafeAreaView style = {styles.userbox}>
            <View>
                <Button title = 'add item'/>
                <Button title = 'owned'/>
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

export default User